import React from 'react'
import '../styles/features.css'
import { IoIosArrowDropright } from "react-icons/io";
import { Navigate, useNavigate } from 'react-router-dom';

function Features() {
  const navigate = useNavigate();  // This line is required
  return (
    <div  className='feature '>
      <div className='flex items-center justify-center gap-2'>
      <h1 className='text-center text-2xl font-bold' >Enhance Your Crop Health with These Powerful Features  </h1>
      <img src="src/assets/leaf.jpg" alt="" className='w-20 h-20 items-center ' />
      </div>
      <div className='flex flex-wrap p-10 gap-18'>
      <div className="f_card">
        <img src="src/assets/pest2.jpg" alt="" className='f_image' />
        <h1 className='text-3xl font-bold mt-2' >Pest Detection and Prevention</h1>
        <p>Snap or upload a photo to identify pests. Our system will analyze it and suggest the pest's name and solutions.</p> 
      <button onClick={() => navigate('/pest-detection')}  className="mt-4 flex justify-between w-50 h-10 items-center rounded-2xl px-3 bg-green-600">
      <h1 className='text-start  text-xl font-bold text-white ' >Use Now</h1>
      <div className='w-8 h-8  text-white '>
      <IoIosArrowDropright className='w-[100%] h-[100%] color-whiy ' />
      </div>
      </button>
      </div>
      <div className="f_card">
        <img src="src/assets/pest2.jpg" alt="" className='f_image' />
        <h1 className='text-3xl font-bold mt-2' >Wholesale Price Index Prediction</h1>
        <p>AI-powered WPI Prediction on our website forecasts future wholesale prices using historical data, helping users make smarter pricing decisions.</p> 
      <button onClick={() => navigate('/wholesale-price')}  className="mt-4 flex justify-between w-50 h-10 items-center rounded-2xl px-3 bg-green-600">
      <h1 className='text-start  text-xl font-bold text-white ' >Use Now</h1>
      <div className='w-8 h-8  text-white '>
      <IoIosArrowDropright className='w-[100%] h-[100%] color-whiy ' />
      </div>
      </button>
      </div>
      <div className="f_card">
        <img src="src/assets/pest2.jpg" alt="" className='f_image' />
        <h1 className='text-3xl font-bold mt-2' >Fertilizer Recommendation</h1>
        <p>AI-powered Fertilizer Recommendation on our website suggests the best fertilizers based on soil data and crop type.</p> 
      <button onClick={() => navigate('/fertilizers')}  className="mt-4 flex justify-between w-50 h-10 items-center rounded-2xl px-3 bg-green-600">
      <h1 className='text-start  text-xl font-bold text-white ' >Use Now</h1>
      <div className='w-8 h-8  text-white '>
      <IoIosArrowDropright className='w-[100%] h-[100%] color-whiy ' />
      </div>
      </button>
      </div>
      <div className="f_card">
        <img src="src/assets/pest2.jpg" alt="" className='f_image' />
        <h1 className='text-3xl font-bold mt-2' >Smart Irigstion System</h1>
        <p>AI-powered Smart Irrigation System on our website provides optimal watering schedules using weather data and soil moisture levels, helping farmers save water and boost crop health.</p> 
      <button onClick={() => navigate('/smart-irigation')}  className="mt-4 flex justify-between w-50 h-10 items-center rounded-2xl px-3 bg-green-600">
      <h1 className='text-start  text-xl font-bold text-white ' >Use Now</h1>
      <div className='w-8 h-8  text-white '>
      <IoIosArrowDropright className='w-[100%] h-[100%] color-whiy ' />
      </div>
      </button>
      </div>
      <div className="f_card">
        <img src="src/assets/pest2.jpg" alt="" className='f_image' />
        <h1 className='text-3xl font-bold mt-2' >Pest Detection and Prevention</h1>
        <p>Snap or upload a photo to identify pests. Our system will analyze it and suggest the pest's name and solutions.</p> 
      <button onClick={() => navigate('/pest-detection')}  className="mt-4 flex justify-between w-50 h-10 items-center rounded-2xl px-3 bg-green-600">
      <h1 className='text-start  text-xl font-bold text-white ' >Use Now</h1>
      <div className='w-8 h-8  text-white '>
      <IoIosArrowDropright className='w-[100%] h-[100%] color-whiy ' />
      </div>
      </button>
      </div>
      </div>
    </div>
  )
}

export default Features