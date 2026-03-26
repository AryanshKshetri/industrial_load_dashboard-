// Base URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Type for prediction response from backend
export interface PredictionResponse {
  next_day_prediction: number;
  next_week_prediction: number[];
  contract_demand: number;
  status: "Safe" | "Risk";
  alert_message: string;
}

// Main function to call /predict endpoint
export async function runPrediction(
  file: File,
  contractDemand: number
): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("contract_demand", contractDemand.toString());

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Prediction failed");
  }

  return response.json();
}
