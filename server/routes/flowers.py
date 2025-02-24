from fastapi import APIRouter
from schemas.Flower import Flower
from services.flower_service import add_flower, get_flowers_from_db

router = APIRouter()

# Route to get all flowers
@router.get("/")
async def get_flowers_route():
    flowers = await get_flowers_from_db()
    return flowers

# Route to add a new flower
@router.post("/")
async def add_flower_route(new_flower: Flower):
    await add_flower(new_flower)  # Calls the service function
    return {"message": "Flower added successfully", "flower": new_flower}
