import pytest
from main_test import is_valid_color_ids

@pytest.mark.parametrize("color_ids, expected", [
    ([1, 2, 3], True),
    ([5], True),
    ([], False),  
    (["red", "blue"], False),  
    ([0, -2], False),
    (None, False),
])
def test_is_valid_color_ids(color_ids, expected):
    assert is_valid_color_ids(color_ids) == expected
