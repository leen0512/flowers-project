from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class FlowerModel(Base):
    __tablename__ = "flowers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    season = Column(String, nullable=True)
    color_ids = Column(String, nullable=True)  # אם יש קשרים, ודאי שזה תואם לסכימה
    image_url = Column(String, nullable=True)
    description = Column(String, nullable=True)
    deleted = Column(Boolean, default=False)
    deleted_on = Column(String, nullable=True)
