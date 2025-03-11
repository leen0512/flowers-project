import pytest
from main_test import is_valid_image_url

@pytest.mark.parametrize("image_url, expected", [
    ("https://example.com/flower.jpg", True),
    ("http://flowersite.com/image.png", True),
    ("   ", False),  # Empty space
    ("", False),  
    (None, False),
])
def test_is_valid_image_url(image_url, expected):
    assert is_valid_image_url(image_url) == expected
