from fastapi import FastAPI
from routes.flowers_route import router as flower_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def welcome():
    return "🌷₊˚⊹(♡˶╹̆ꇴ╹̆˶)੭ Welcome to a garden of joy! ✨💐"


app.include_router(flower_router, prefix="/flowers")