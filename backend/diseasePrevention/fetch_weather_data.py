""" read json file """

class WeatherFetcher:
    def __init__(self):
        self.weather_data = {
            "temperature": 28,  # °C
            "humidity": 65,  # %
            "weather": "Sunny"
        }

    def get_weather(self):
        """Returns current weather data (hardcoded for now)"""
        return self.weather_data
