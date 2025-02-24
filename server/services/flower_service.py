from schemas.Flower import Flower

mockFlowers = []

async def get_flowers_from_db():
    return mockFlowers

async def add_flower(flower: Flower):
    flower.id = len(mockFlowers) + 1  # Assign new ID
    mockFlowers.append(flower)

