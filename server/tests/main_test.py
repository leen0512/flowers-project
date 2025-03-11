from typing import List
import re

VALID_SEASONS = {"spring", "summer", "autumn", "winter"}

def is_valid_name(name: str) -> bool:
    if not isinstance(name, str) or len(name) < 3:
        return False
    if not re.match(r'^\S.*$', name):  # No leading spaces
        return False
    if not re.match(r'^[A-Za-z][A-Za-z ]*[A-Za-z]$', name):  # Letters and spaces only
        return False
    return True

def is_valid_season(season: str) -> bool:
    return isinstance(season, str) and season.strip() in VALID_SEASONS

def is_valid_color_ids(color_ids: List[int]) -> bool:
    return isinstance(color_ids, list) and len(color_ids) >= 1 and all(isinstance(color, int) and color > 0 for color in color_ids)

def is_valid_description(description: str) -> bool:
    return isinstance(description, str) and bool(re.match(r'^\S.*$', description))  # No leading spaces and not empty

def is_valid_image_url(image_url: str) -> bool:
    return isinstance(image_url, str) and bool(re.match(r'^\S.*$', image_url))  # No leading spaces and not empty
