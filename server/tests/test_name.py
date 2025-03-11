import pytest
from main_test import is_valid_name

@pytest.mark.parametrize("name, expected", [
    ("peony", True),
    ("cherry blossom", True),
    ("123", False),
    ("peony45_", False),
    ("lav!", False),
    ("", False)
])
def test_is_valid_name(name, expected):
    assert is_valid_name(name) == expected
