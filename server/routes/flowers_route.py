from fastapi import APIRouter, Depends
from schemas.Flower_schema import Flower
from services.flower_service import add_flower, get_flowers_from_db
from sqlalchemy.orm import Session
from database import get_db


router = APIRouter()

# Route to get all flowers
@router.get("/")
async def get_flowers_route(db: Session = Depends(get_db)):
    return await get_flowers_from_db(db) 


# Route to add a new flower
@router.post("/")
async def add_flower_route(new_flower: Flower, db: Session = Depends(get_db)):
    return await add_flower(db, new_flower)
    