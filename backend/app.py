from fastapi import FastAPI
from services.route_service import RouteService
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Seoul Subway Route Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

service = RouteService()


@app.get("/")
def home():
    return {"message": "Seoul Subway Route Planner API is running!"}


@app.get("/route")
def get_route(start: str, end: str):
    try:
        return service.find_route(start, end)
    except ValueError as e:
        return {"error": str(e)}

@app.get("/stations")
def get_stations():
    stations = service.get_all_stations()
    return stations