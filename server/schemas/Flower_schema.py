from pydantic import BaseModel
from typing import List, Optional

class Flower(BaseModel):
    id: Optional[int] = None
    name: str
    season: str
    color_ids: List[int]
    image_url: str
    description: str