import { combineReducers } from '@reduxjs/toolkit'
import { selectedCityReducer } from './slices/selected-city';
import { temperatureUnitReducer } from './slices/temperature-unit';
import { selectedDateReducer } from './slices/selected-date';
import { dailyForecastReducer } from './slices/daily-forecast';


const rootReducer = combineReducers({
  selectedCity: selectedCityReducer,
  temperatureUnit: temperatureUnitReducer,
  selectedDate: selectedDateReducer,
  dailyForecast: dailyForecastReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;