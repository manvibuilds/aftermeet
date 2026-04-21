import pytest

def test_example():
    assert 1 + 1 == 2

def test_string():
    assert "hello".upper() == "HELLO"

def test_list():
    assert len([1, 2, 3]) == 3