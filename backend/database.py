# import psycopg2
# import os
# from dotenv import load_dotenv

# load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")

# def get_connection():
#     """Returns a connection to the Neon database"""
#     return psycopg2.connect(DATABASE_URL)

# def save_prediction(
#     contract_demand: float,
#     next_day_prediction: float,
#     next_week_prediction: list,
#     status: str,
#     alert_message: str
# ):
#     """Saves prediction result to database"""
#     import json
#     conn = get_connection()
#     cur = conn.cursor()
#     try:
#         cur.execute("""
#             INSERT INTO predictions 
#             (contract_demand, next_day_prediction, next_week_prediction, status, alert_message)
#             VALUES (%s, %s, %s, %s, %s)
#         """, (
#             contract_demand,
#             next_day_prediction,
#             json.dumps(next_week_prediction),
#             status,
#             alert_message
#         ))
#         conn.commit()
#     finally:
#         cur.close()
#         conn.close()

# def get_recent_predictions(limit: int = 10):
#     """Fetches recent predictions from database"""
#     conn = get_connection()
#     cur = conn.cursor()
#     try:
#         cur.execute("""
#             SELECT id, created_at, contract_demand, next_day_prediction, 
#                    status, alert_message
#             FROM predictions
#             ORDER BY created_at DESC
#             LIMIT %s
#         """, (limit,))
#         rows = cur.fetchall()
#         return [
#             {
#                 "id": str(row[0]),
#                 "created_at": str(row[1]),
#                 "contract_demand": row[2],
#                 "next_day_prediction": row[3],
#                 "status": row[4],
#                 "alert_message": row[5]
#             }
#             for row in rows
#         ]
#     finally:
#         cur.close()
#         conn.close()

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
    alert_message: str
):
    """Saves prediction result to database"""
    import json
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO predictions 
            (contract_demand, next_day_prediction, next_week_prediction, status, alert_message)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            contract_demand,
            next_day_prediction,
            json.dumps(next_week_prediction),
            status,
            alert_message
        ))
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Database save skipped: {e}")


def get_recent_predictions(limit: int = 10):
    """Fetches recent predictions from database"""
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, created_at, contract_demand, next_day_prediction, 
                   status, alert_message
            FROM predictions
            ORDER BY created_at DESC
            LIMIT %s
        """, (limit,))
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