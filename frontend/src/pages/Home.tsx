import axios from 'axios';
import { React, useEffect, useState } from 'react';
import '../styles/dashboard.css'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue with Leaflet (in React projects)
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
// import Navbar from '../components/Navbar'
// import Navbar from '../components/Navbar'
const openweatherKey = '763e13cdd2f2a1ce54c868f24f7a0cec';

interface WeatherData {
  weather: { main: string; description: string; icon: string }[];
  main :{ temp : number , humidity : number , feels_like: number ,pressure:string ,  }
  visibility : string 
}


function Home() {
  // const [lo, setlo] = useState(second)
  const [location, setLocation] = useState<string>('');
  const [forecast, setForecast] = useState<WeatherData | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);  // Fixed typing
  const [longitude, setLongitude] = useState<number | null>(null); // Fixed typing

    const getMyLocationName = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            setLatitude(lat);      // Store latitude
            setLongitude(lon);      // Store longitude

            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
                .then(response => response.json())
                .then(data => {
                    setLocation(data.locality);
                    localStorage.setItem('user.locationName', data.locality);
                    console.log('User Location:', data.locality);
                })
                .catch(error => console.error('Error fetching location:', error));
        }, (error) => {
            console.error('Geolocation error:', error);
        });
    };

    const getWeather = (lat:number ,  lon:number) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openweatherKey}`)

            .then(response => {
                console.log(response.data);
                setForecast(response.data);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
            });
            
    };

    useEffect(() => {
        getMyLocationName();
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            getWeather(latitude, longitude);
        }
    }, [latitude, longitude]);

    const mainWeather = forecast?.weather?.[0]?.main ?? 'N/A';
    const description = forecast?.weather?.[0]?.description ?? 'N/A';
    const tempreature = forecast?.main?.temp
    const feels_linke = forecast?.main?.feels_like
    const humidity = forecast?.main?.humidity
    const visibilty = forecast?.visibility

  return (
    
    <div className="home-page">
    <div className=' p-10 flex'  id="dashboard">
      <div id="profile" className='w-[60%] h-70 flex-col ml-2' >
        <div id="user" className='flex '  >
        <div  id="user_img" className=' h-70 ' >
        <img src="src/assets/user2.jpg" alt="" className='w-[100%] h-[100%] border-1 rounded-full bg-amber-300 ' />
        </div>
        <div id="info" className='pl-8 mt-10 flex-col flex-wrap ' >
          <h1 className='text-[#00a556] font-bold text-6xl ' >Arya Bhatta</h1>
          <p className='font-bold text-3xl mt-5 w-130 ' >Currently working on Rice fields  over 12 accers on land in {location} </p>
        </div>
        </div>
        <div id="cards" className=' w-[100%] h-65 mt-10 ml-15 flex gap-6' >
          <div className="card" >
  
                                <img
                                    src="src/assets/weather.jpg"
                                    alt="Weather Icon"
                                    className='w-30 h-30 border-1 mt-3 rounded-full'
                                />
                            
            <div className="cardInfo ">
                                <p className="font-bold text-2xl">Weather: {mainWeather}</p>
                                <p className="text-xl text-gray-500 mt-2 ">Description: {description}</p>
                            </div>
          </div>
          <div className="card">
            <img src="src/assets/temp.jpg" alt="" className='w-30 h-30 border-1 mt-3 rounded-full'/>
            <div className="cardInfo">
                                <p className="font-bold text-2xl">Temperature: {tempreature} c</p>
                                <p className="text-xl text-gray-500 mt-2 ">Feels Like : {feels_linke} c</p>
                            </div>
            </div>
          <div className="card">
          <img src="src/assets/humi.jpg" alt="" className='w-30 h-30 border-1 mt-3 rounded-full'/>
          <div className="cardInfo">
                                <p className="font-bold text-2xl">Humidity: {humidity}%</p>
                                <p className="text-xl text-gray-500 mt-2 ">Visibilty : {visibilty} meters</p>
                            </div>
          </div>
        </div>
      </div>
    <div id="map" className='w-[37vw] h-[75vh]  rounded-4xl overflow-hidden ' >
    {latitude && longitude ? (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      className="w-full h-full"
      style={{ zIndex: 0 }} // Ensure map tiles don't overlap
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[latitude, longitude]}
        icon={L.icon({
          iconUrl: markerIconPng,
          shadowUrl: markerShadowPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        })}
      >
        <Popup>
          You are here — <b>{location}</b>
        </Popup>
      </Marker>
    </MapContainer>
  ) : (
    <p className="text-gray-500 text-2xl text-center">Loading map...</p>
  )}
</div>
    </div>
    </div>
    
  )
}

export default Home