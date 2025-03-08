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
from fertilizerRecommender.fertilizer import FertilizerRecommender
from irrigation.irrigation_advisor import WaterRequirementPredictor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class InputData(BaseModel):
    input_values: List[float]

base_dir = os.path.dirname(os.path.abspath(__file__))  

pest_detector = PestDetectionModel(os.path.join(base_dir, "pestDetection/resnet_finetuned.pth"))
disease_prevention = DiseasePrevention()
weather_fetcher = WeatherFetcher()
food_price_predictor = FoodPricePredictor(os.path.join(base_dir,"foodPrice/model.jbl.lzma"))
fertilizer = FertilizerRecommender()
water_predictor = WaterRequirementPredictor()

os.makedirs("temp", exist_ok=True)
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from typing import Optional
import shutil
import os

global_weather_data = {"temperature": None, "humidity": None, "weather_main": None}


@app.post("/analyze_image")
async def analyze_image(
    image: UploadFile = File(...),
    temperature: float = Form(...),
    humidity: float = Form(...),
    weather_main: str = Form(...)
):
    """Detects pest/disease from the image and uses provided weather data for prevention measures."""
    global global_weather_data
    global_weather_data["temperature"] = temperature
    global_weather_data["humidity"] = humidity
    global_weather_data["weather_main"] = weather_main
    image_path = f"temp/{image.filename}"
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    try:
        predicted_class = pest_detector.predict(image_path)
        print(temperature)
        print(humidity)
        print(weather_main)
        response = disease_prevention.get_prevention_plan(
            predicted_class, temperature, humidity, weather_main
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

class FertilizerInput(BaseModel):
    crop_type: str
    soil_type: str

@app.post("/fertilizer_recommend")
def predict_fertilizer(data: FertilizerInput):
    """Recommends the best fertilizer based on crop type, soil type, and hardcoded temperature/humidity values."""
    try:
        input_data = {
            "Temparature": 30,  
            "Humidity": 40,      
            "Moisture": 35,     
            "Soil Type": data.soil_type,
            "Crop Type": data.crop_type,
        }

        recommended_fertilizer = fertilizer.predict(input_data)
        return {"recommended_fertilizer": recommended_fertilizer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/irrigation")
def predict_water_requirement(crop_type: str, soil_type: str, rainfall: float):
    """Endpoint to predict water requirement."""
    try:
        f"Real time Data{ global_weather_data["temperature"]}, {global_weather_data["humidity"]}"
        result = water_predictor.predict(crop_type, soil_type,   global_weather_data["temperature"], global_weather_data["humidity"], 25, rainfall)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
