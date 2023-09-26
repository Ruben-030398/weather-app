import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ForecastData, TemperatureUnitEnum } from "../../types";
import axios from "axios";

const initialState: { loading: boolean, data: ForecastData | null } = {
  loading: false,
  data: null
}

type FetchCurrentWeather = {
  unit?: TemperatureUnitEnum
}

export const fetchDailyForecast = createAsyncThunk(
  'dailyForecast/fetchDailyForecast',
  async ({ unit }: FetchCurrentWeather = {}, thunkApi) => {
    thunkApi.dispatch(getDailyForecast());    

    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&units=${unit}&lon=${longitude}&cnt=6&appid=9d47825e8b4e7545203d89968372299c`;

      const result = await axios.get(apiUrl);

      thunkApi.dispatch(setDailyForecast(result.data));
    });
  }
)

const dailyForecast = createSlice({
  name: 'dailyForecast',
  initialState: initialState,
  reducers: {
    setDailyForecast: (state, data: PayloadAction<ForecastData>) => {
      state.loading = false;
      state.data = data.payload;
    },
    getDailyForecast: (state) => {
      state.loading = true;
    }
  },
})


export const { reducer: dailyForecastReducer, actions } = dailyForecast;

export const { getDailyForecast, setDailyForecast } = actions;