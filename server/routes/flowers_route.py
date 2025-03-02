from fastapi import APIRouter, Depends
from schemas.Flower_schema import Flower
from services.flower_service import add_flower, get_flowers_from_db
from sqlalchemy.orm import Session
from models.FlowerModel import FlowerModel
from database import get_db
from datetime import datetime

router = APIRouter()

# Route to get all flowers
@router.get("/")
async def get_flowers_route(db: Session = Depends(get_db)):
    return await get_flowers_from_db(db) 


# Route to add a new flower
@router.post("/")
async def add_flower_route(new_flower: Flower, db: Session = Depends(get_db)):
    return await add_flower(db, new_flower)
    


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
    return {"message": "Flower deleted successfully"}


@router.put("/restore/{flower_id}")
async def restore_flower(flower_id: int, db: Session = Depends(get_db)):
    flower = db.query(FlowerModel).filter(FlowerModel.id == flower_id).first()
    
    # Debugging log to check if flower is found
    print(f"Found flower: {flower}")
    
    if not flower:
        raise HTTPException(status_code=404, detail="Flower not found")
    
    if not flower.deleted:
        # Flower is not deleted, so no restoration is necessary
        raise HTTPException(status_code=400, detail="Flower not deleted")
    
    flower.deleted = False  # Restore the flower
    flower.deleted_on = None  # Optional: Remove deleted timestamp
    db.commit()
    
    # Debugging log to check restored flower
    print(f"Flower restored: {flower}")
    
    return {"message": f"Flower with id {flower_id} restored successfully"}