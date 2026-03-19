from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from dotenv import load_dotenv
import pandas as pd
import numpy as np
import io
import os

from utils import validate_csv, clean_data
from model import load_model, predict_next_24h, predict_next_week
from schemas import PredictionResponse

# ─────────────────────────────────────────
# Load environment variables from .env file
# ─────────────────────────────────────────
load_dotenv()
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "http://localhost:3000")

# ─────────────────────────────────────────
# Rate Limiter setup
# ─────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

# ─────────────────────────────────────────
# Initialize FastAPI app
# ─────────────────────────────────────────
app = FastAPI(title="Industrial Load Forecasting API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ─────────────────────────────────────────
# CORS — Allow frontend to talk to backend
# ─────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

# ─────────────────────────────────────────
# Load ML model at startup
# ─────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH    = os.path.join(BASE_DIR, "../ml_model/load_prediction_model.pkl")
FEATURES_PATH = os.path.join(BASE_DIR, "../ml_model/model_features.pkl")

model, features = load_model(MODEL_PATH, FEATURES_PATH)

# ─────────────────────────────────────────
# ENDPOINTS
# ─────────────────────────────────────────

@app.get("/health")
@limiter.limit("30/minute")
def health_check(request: Request):
    """Check if backend is running"""
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
@limiter.limit("10/minute")
async def predict(
    request: Request,
    file: UploadFile = File(...),
    contract_demand: float = Form(...)
):
    """
    Accepts CSV file + contract demand value.
    Returns next day and next week predictions + alert status.
    """
    # Validate contract demand range
    if contract_demand <= 0 or contract_demand > 100000:
        return JSONResponse(
            status_code=422,
            content={"error": "contract_demand must be between 1 and 100,000"}
        )

    # Validate file type
    if not file.filename.endswith(".csv"):
        return JSONResponse(
            status_code=422,
            content={"error": "Only CSV files are allowed"}
        )

    # Read uploaded CSV
    contents = await file.read()

    # Limit file size to 5MB
    if len(contents) > 5 * 1024 * 1024:
        return JSONResponse(
            status_code=422,
            content={"error": "File too large. Maximum size is 5MB"}
        )

    try:
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
    except Exception:
        return JSONResponse(
            status_code=422,
            content={"error": "Could not read CSV file. Please check the format"}
        )

    # Validate CSV structure
    try:
        validate_csv(df)
    except ValueError as e:
        return JSONResponse(status_code=422, content={"error": str(e)})

    # Clean data
    df = clean_data(df)

    # Predict next 24 hours
    next_day_preds = predict_next_24h(df, model, features)
    next_day_avg   = round(sum(next_day_preds) / len(next_day_preds), 2)

    # Predict next week
    next_week_preds = predict_next_week(df, model, features)

    # Alert logic
    if next_day_avg > contract_demand:
        status = "Risk"
        alert_message = f"⚠️ Predicted load {next_day_avg} kW exceeds contract demand of {contract_demand} kW!"
    else:
        status = "Safe"
        alert_message = f"✅ Predicted load {next_day_avg} kW is within contract demand of {contract_demand} kW."

    return PredictionResponse(
        next_day_prediction=next_day_avg,
        next_week_prediction=next_week_preds,
        contract_demand=contract_demand,
        status=status,
        alert_message=alert_message
    )
