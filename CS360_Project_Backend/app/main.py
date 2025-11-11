# Use uvicorn app.main:app --reload to run it
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.view import user_routes, library_routes
from app.config.database import init_database
from app.utils.logger import logger

app = FastAPI(
    title="Book Recommender",
    description="A Book Recommendation Software",
    version="0.0.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


init_database() # need this to actually startup our database


# learned this yesterday its a further abstraction of our routes aint that neat!
app.include_router(user_routes.router, prefix="/user") 
app.include_router(library_routes.router, prefix="/library")

@app.get("/")
async def root():
    return {"Welcome": "Yo this be my page yo"}

