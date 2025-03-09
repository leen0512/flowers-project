from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
# import pandas as pandas
# import numpy as np

DATABASE_URL = "postgresql://postgres:Alkerem1!@db:5435/flowers_db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db #similar to return
    finally:
        db.close()

