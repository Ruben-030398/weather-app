import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ForecastData, TemperatureUnitEnum } from "../../types";
import axios from "axios";

const initialState: { loading: boolean, data: ForecastData | null } = {
  loading: false,
  data: null
}

type FetchCurrentWeather = {
  city?: string,
  unit?: TemperatureUnitEnum,
}

export const fetchWeatherForecast = createAsyncThunk(
  'weatherForecast/fetchWeatherForecast',
  async ({ city, unit }: FetchCurrentWeather, thunkApi) => {
    thunkApi.dispatch(getWeatherForecast());    

    if (city) {
      const result = await axios.get<ForecastData>(`https://api.openweathermap.org/data/2.5/forecast?q=${city || ''}&units=${unit || TemperatureUnitEnum.Metric}&cnt=5&appid=9d47825e8b4e7545203d89968372299c`);

      
      thunkApi.dispatch(setWeatherForecast(result.data));
    }

    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit || TemperatureUnitEnum.Metric}&cnt=5&appid=9d47825e8b4e7545203d89968372299c`;

      const result = await axios.get(apiUrl);

      thunkApi.dispatch(setWeatherForecast(result.data));
    });
  }
)

const currentWeather = createSlice({
  name: 'weatherForecast',
  initialState: initialState,
  reducers: {
    setWeatherForecast: (state, data: PayloadAction<ForecastData>) => {
      state.loading = false;
      state.data = data.payload;
    },
    getWeatherForecast: (state) => {
      state.loading = true;
    }
  },
})


export const { reducer: weatherForecastReducer, actions } = currentWeather;

export const { getWeatherForecast, setWeatherForecast } = actions;