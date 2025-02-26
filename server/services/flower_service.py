from schemas.Flower_schema import Flower
from sqlalchemy.orm import Session
from models.FlowerModel import FlowerModel


mockFlowers = [
]


async def get_flowers_from_db(db: Session):
    return db.query(FlowerModel).all()


async def add_flower(db: Session, flower: Flower):
    db_flower = FlowerModel(
        name = flower.name,
        season = flower.season,
        color_ids = flower.color_ids,
        image_url = flower.image_url,
        description = flower.description
    )
    db.add(db_flower)
    db.commit()
    db.refresh(db_flower) 
    return db_flower

    
