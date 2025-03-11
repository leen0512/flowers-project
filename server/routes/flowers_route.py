from fastapi import APIRouter, Depends, HTTPException
from schemas.Flower_schema import Flower
from services.flower_service import add_flower, get_flowers_from_db, get_deleted_flowers_from_db
from sqlalchemy.orm import Session
from models.FlowerModel import FlowerModel
from database import get_db
from datetime import datetime

router = APIRouter()

@router.get("/")
async def get_flowers_route(db: Session = Depends(get_db)):
    return await get_flowers_from_db(db)

@router.get("/bin")
async def get_bin_flowers_route(db: Session = Depends(get_db)):
    return await get_deleted_flowers_from_db(db)

# Route to add a new flower
@router.post("/")
async def add_flower_route(new_flower: Flower, db: Session = Depends(get_db)):
    return await add_flower(db, new_flower)


@router.get("/{flower_id}") 
def get_flower(flower_id: int, db: Session = Depends(get_db)):
    flower = db.query(FlowerModel).filter(FlowerModel.id == flower_id).first()
    if not flower:
        raise HTTPException(status_code=404, detail="Flower not found")
    return flower



@router.put("/{flower_id}")
async def update_flower(flower_id: int, updated_flower: Flower, db: Session = Depends(get_db)):
    flower = db.query(FlowerModel).filter(FlowerModel.id == flower_id).first()
    
    if not flower:
        raise HTTPException(status_code=404, detail="Flower not found")
    
    # Only update fields that are present
    flower.name = updated_flower.name or flower.name
    flower.season = updated_flower.season or flower.season
    flower.color_ids = updated_flower.color_ids if updated_flower.color_ids else flower.color_ids
    flower.image_url = updated_flower.image_url or flower.image_url
    flower.description = updated_flower.description or flower.description
    flower.deleted = updated_flower.deleted if updated_flower.deleted is not None else flower.deleted

    if updated_flower.deleted:
        flower.deleted_on = datetime.utcnow()  # Set deleted_on only if deleting
    else:
        flower.deleted_on = None  # Reset if not deleted
    
    db.commit()
    
    return {"message": "Flower updated successfully", "flower": flower}



@router.put("/delete/{flower_id}")
async def soft_delete_flower(flower_id: int, db: Session = Depends(get_db)):
    flower = db.query(FlowerModel).filter(FlowerModel.id == flower_id).first()
    
    if not flower:
        raise HTTPException(status_code=404, detail="Flower not found")
    
    if flower.deleted:
        raise HTTPException(status_code=400, detail="Flower already deleted")
    
    flower.deleted = True
    flower.deleted_on = datetime.utcnow()
    db.commit()
    return {"message": f"Flower {flower.name} (ID: {flower.id}) deleted successfully"}


@router.put("/restore/{flower_id}")
async def restore_flower(flower_id: int, db: Session = Depends(get_db)):
    flower = db.query(FlowerModel).filter(FlowerModel.id == flower_id).first()
    
    if not flower:
        raise HTTPException(status_code=404, detail="Flower not found")
    
    if not flower.deleted:
        raise HTTPException(status_code=400, detail="Flower is not deleted")
    
    flower.deleted = False
    flower.deleted_on = None
    db.commit()
    return {"message": f"Flower {flower.name} (ID: {flower.id}) restored successfully"}