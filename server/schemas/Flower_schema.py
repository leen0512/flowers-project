from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Flower(BaseModel):
    id: Optional[int] = None
    name: str
    season: str
    color_ids: list[int]
    image_url: str
    description: str
    deleted: Optional[bool] = False
    deleted_on: Optional[datetime] = None