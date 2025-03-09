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

@router.get("/bin", tags=["Flowers"], include_in_schema=True)
async def get_bin_flowers_route(db: Session = Depends(get_db)):
    return await get_deleted_flowers_from_db(db)


# Route to add a new flower
@router.post("/")
async def add_flower_route(new_flower: Flower, db: Session = Depends(get_db)):
    return await add_flower(db, new_flower)

@router.put("/{flower_id}")
async def update_flower(flower_id: int, updated_flower: Flower, db: Session = Depends(get_db)):
    flower = db.query(FlowerModel).filter(FlowerModel.id == flower_id).first()
    
    if not flower:
        raise HTTPException(status_code=404, detail="Flower not found")
    
    # Update fields
    flower.name = updated_flower.name
    flower.season = updated_flower.season
    flower.color_ids = updated_flower.color_ids
    flower.image_url = updated_flower.image_url
    flower.description = updated_flower.description
    flower.deleted = updated_flower.deleted

    # If the flower is being marked as deleted, set the `deleted_on` field
    if updated_flower.deleted:
        flower.deleted_on = datetime.utcnow()
    else:
        flower.deleted_on = None  # Reset deleted_on if restoring
    
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