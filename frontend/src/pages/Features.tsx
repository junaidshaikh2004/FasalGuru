import React from "react";
import "../styles/features.css";
import { useNavigate } from "react-router-dom";
import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";

function Features() {
  const navigate = useNavigate();

  const featuresData = [
    {
      title: "Pest Detection and Prevention",
      para: "Snap or upload a photo to identify pests. Our system will analyze it and suggest the pest's name and solutions.",
      img: "src/assets/pest2.jpg",
      navigateTo: () => navigate("/pest-detection"),
    },
    {
      title: "Wholesale Price Index ",
      para: "AI-powered WPI Prediction on our website forecasts future wholesale prices using historical data.",
      img: "src/assets/wholesale.jpg",
      navigateTo: () => navigate("/wholesale-price"),
    },
    {
      title: "Fertilizer Recommendation",
      para: "AI-powered Fertilizer Recommendation on our website suggests the best fertilizers based on soil data and crop type.",
      img: "src/assets/ferti.jpg",
      navigateTo: () => navigate("/fertilizers"),
    },
    {
      title: "Smart Irrigation System",
      para: "AI-powered Smart Irrigation System on our website provides optimal watering schedules using weather data , helping farmers save water.",
      img: "src/assets/irigation.jpg",
      navigateTo: () => navigate("/smart-irigation"),
    },
  ];

  return (
    <div className="feature">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-center text-4xl font-bold">
          Enhance Your Crop Health with These Powerful Features{" "}
        </h1>
        <img
          src="src/assets/leaf.jpg"
          alt=""
          className="w-20 h-20 items-center"
        />
      </div>

      <div className="swipe  flex flex-wrap p-10 gap-18 ml-10">
        {featuresData.map((feature, index) => (
          <div className="f_card" key={index}>
            <ThreeDCardDemo
              title={feature.title}
              para={feature.para}
              img={feature.img}
              onClick={feature.navigateTo} // Pass the navigation function to the component
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;

