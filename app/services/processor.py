# app/services/processor.py 

def compute_sum(a: int, b: int) -> int:
    """Compute the sum of two integers."""
    return a + b

def reverse_string(s: str) -> str:
    """Reverse a string."""
    return s[::-1] 

def is_palindrome(s: str) -> bool:
    """Check if a string is a palindrome."""
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    # Check if the cleaned string is equal to its reverse
    return cleaned == cleaned[::-1]