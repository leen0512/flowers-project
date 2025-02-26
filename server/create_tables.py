from database import engine, Base
from models.FlowerModel import FlowerModel
from models.ColorsModel import Colors

Base.metadata.create_all(bind=engine)