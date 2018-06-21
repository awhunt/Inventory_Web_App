"""
Search development configuration.

AWHUNT JASONWOZ MMONTORI
"""

import os

DATABASE_FILENAME = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'search', 'var', 'ace_items.sqlite3'
)
