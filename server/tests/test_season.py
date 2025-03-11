import pytest
from main_test import is_valid_season

@pytest.mark.parametrize("season, expected", [
    ("spring", True),
    ("summer", True),
    ("autumn", True),
    ("winter", True),
    ("", False),  
    ("    ", False),  
    ("rainy", False),  # Invalid season
    ("Fall", False),  # Case-sensitive, should be lowercase "autumn"
    (None, False),
])
def test_is_valid_season(season, expected):
    assert is_valid_season(season) == expected
