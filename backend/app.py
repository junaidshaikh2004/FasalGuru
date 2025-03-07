from fastapi import FastAPI, File, UploadFile, HTTPException
import shutil
import os
from diseasePrevention.prevent import DiseasePrevention
from diseasePrevention.fetch_weather_data import WeatherFetcher
from pestDetection.detect import PestDetectionModel
from foodPrice.food_price import FoodPricePredictor
from fastapi import Form
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

app = FastAPI()

class InputData(BaseModel):
    input_values: List[float]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


pest_detector = PestDetectionModel("pestDetectvdion/resnet_finetuned.pth", "C:/project/data/train")
disease_prevention = DiseasePrevention()
weather_fetcher = WeatherFetcher()
food_price_predictor = FoodPricePredictor("C:/project/backend/foodPrice/model.jbl.lzma")

os.makedirs("temp", exist_ok=True)

@app.post("/analyze_image/")
async def analyze_image(image: UploadFile = File(...)):
    """Detects pest/disease from the image, fetches weather data, and returns prevention measures."""
    image_path = f"temp/{image.filename}"
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    try:
        predicted_class = pest_detector.predict(image_path)
        weather_data = weather_fetcher.get_weather()
        response = disease_prevention.get_prevention_plan(
            predicted_class, weather_data["temperature"], weather_data["humidity"], weather_data["weather"]
        )
        os.remove(image_path)
        return {"predicted_disease": predicted_class, "prevention_measures": response}
    except Exception as e:
        os.remove(image_path)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict_price")
def predict_price(data: InputData):  # Accept form input properly
    """Predicts food price based on input values."""
    try:
        
        result = food_price_predictor.predict(data.input_values)
        print(f"Prediction resUult: {result}")
        return {"predicted_price": result}
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}\nTraceback: {error_details}")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
