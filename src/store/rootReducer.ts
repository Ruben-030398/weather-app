import { combineReducers } from '@reduxjs/toolkit'
import { selectedCityReducer } from './slices/selected-city';
import { currentWeatherReducer } from './slices/current-weather'
import { temperatureUnitReducer } from './slices/temperature-unit';
import { weatherForecastReducer } from './slices/hourly-forecast';
import { selectedDateReducer } from './slices/selected-date';
import { dailyForecastReducer } from './slices/daily-forecast';


const rootReducer = combineReducers({
  selectedCity: selectedCityReducer,
  currentWeather: currentWeatherReducer,
  temperatureUnit: temperatureUnitReducer,
  weatherForecast: weatherForecastReducer,
  selectedDate: selectedDateReducer,
  dailyForecast: dailyForecastReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;