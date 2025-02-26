from sqlalchemy import Column, Integer, String, ARRAY
from sqlalchemy.orm import relationship
from database import Base

class Colors(Base):
    __tablename__ = "colors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

