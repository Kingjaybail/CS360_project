# Use uvicorn app.main:app --reload to run it
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.view import user_routes, library_routes, data_routes
from app.config.database import init_database
# from app.utils.logger import logger

app = FastAPI(
    title="Book Recommender",
    description="A Book Recommendation Software",
    version="0.0.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["bookrec-three.vercel.app"], #keep it like this for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


init_database() # need this to actually startup our database


# learned this yesterday its a further abstraction of our routes aint that neat!
app.include_router(user_routes.router, prefix="/user") 
app.include_router(library_routes.router, prefix="/library")
app.include_router(data_routes.router, prefix="/data")

@app.api_route("/", methods=["GET", "HEAD"])
def root():
    return {"status": "ok"}

