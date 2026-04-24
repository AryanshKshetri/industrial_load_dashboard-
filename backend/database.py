import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    """Returns a connection to the Neon database"""
    return psycopg2.connect(DATABASE_URL)


def save_prediction(
    contract_demand: float,
    next_day_prediction: float,
    next_week_prediction: list,
    status: str,
    alert_message: str, 
    user_id: str = "anonymous" 
):
    """Saves prediction result to database"""
    import json
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO predictions 
            (contract_demand, next_day_prediction, next_week_prediction, status, alert_message , user_id)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            contract_demand,
            next_day_prediction,
            json.dumps(next_week_prediction),
            status,
            alert_message,
            user_id
        ))
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Database save skipped: {e}")


def get_recent_predictions(limit: int = 10 , user_id: str = "anonymous"):
    """Fetches recent predictions from database"""
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, created_at, contract_demand, next_day_prediction, 
                   status, alert_message
            FROM predictions
            WHERE user_id = %s
            ORDER BY created_at DESC
            LIMIT %s
        """, (user_id,limit))
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return [
            {
                "id": str(row[0]),
                "created_at": str(row[1]),
                "contract_demand": row[2],
                "next_day_prediction": row[3],
                "status": row[4],
                "alert_message": row[5]
            }
            for row in rows
        ]
    except Exception as e:
        print(f"Database fetch skipped: {e}")
        return []

def get_user_settings(user_id: str = "anonymous"):
    """Fetches user settings from database"""
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT user_id, contract_demand, factory_name, industry_type, location
            FROM user_settings
            WHERE user_id = %s
        """, (user_id,))
        row = cur.fetchone()
        cur.close()
        conn.close()
        if row:
            return {
                "user_id": row[0],
                "contract_demand": row[1],
                "factory_name": row[2],
                "industry_type": row[3],
                "location": row[4]
            }
        return None
    except Exception as e:
        print(f"Settings fetch skipped: {e}")
        return None


def save_user_settings(
    user_id: str,
    contract_demand: float,
    factory_name: str,
    industry_type: str,
    location: str
):
    """Saves or updates user settings in database"""
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO user_settings (user_id, contract_demand, factory_name, industry_type, location)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (user_id) DO UPDATE SET
                contract_demand = EXCLUDED.contract_demand,
                factory_name = EXCLUDED.factory_name,
                industry_type = EXCLUDED.industry_type,
                location = EXCLUDED.location,
                updated_at = NOW()
        """, (user_id, contract_demand, factory_name, industry_type, location))
        conn.commit()
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Settings save skipped: {e}")
        return False
