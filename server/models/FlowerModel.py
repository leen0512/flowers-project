from sqlalchemy import Column, Integer, String, ARRAY
from sqlalchemy.orm import relationship
from database import Base

class FlowerModel(Base):
    __tablename__ = "flowers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    season = Column(String, nullable=False)
    color_ids = Column(ARRAY(Integer), nullable=False)
    image_url = Column(String, nullable=False)
    description = Column(String, nullable=False)
