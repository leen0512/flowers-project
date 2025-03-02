from sqlalchemy import Column, Integer, String, ARRAY, Boolean, DateTime
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
    deleted = Column(Boolean, default=False)  # עמודת Soft Delete
    deleted_on = Column(DateTime, nullable=True)  # תאריך מחיקה
