import pytest
from main_test import is_valid_description

@pytest.mark.parametrize("description, expected", [
    ("A beautiful flower that blooms in spring.", True),
    ("     ", False),  # Empty space should not be valid
    ("", False),  
    ("Flower of the sun.", True),
])
def test_is_valid_description(description, expected):
    assert is_valid_description(description) == expected
