import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ForecastData, TemperatureUnitEnum } from "../../types";
import axios from "axios";
import { setSelectedDate } from "./selected-date";

const initialState: { loading: boolean, data: ForecastData | null, error: string } = {
  loading: false,
  data: null,
  error: ''
}

type FetchCurrentWeather = {
  unit?: TemperatureUnitEnum,
  city: string
}

export const fetchDailyForecast = createAsyncThunk(
  'dailyForecast/fetchDailyForecast',
  async ({ unit, city }: FetchCurrentWeather, thunkApi) => {
    thunkApi.dispatch(getDailyForecast());

    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiUrl = `${import.meta.env.VITE_APP_ENDPOINT}?lat=${latitude}&q=${city}&units=${unit}&lon=${longitude}&appid=${import.meta.env.VITE_APP_API_KEY}`;

      try {

        const result = await axios.get<ForecastData>(apiUrl);

        thunkApi.dispatch(setSelectedDate(result.data.list[0].dt_txt))
        thunkApi.dispatch(setDailyForecast(result.data));
      } catch (e: unknown) {
        if (e instanceof Error) {
          
          thunkApi.dispatch(setError(e.message));
        }
      }
    });
  }
)

const dailyForecast = createSlice({
  name: 'dailyForecast',
  initialState: initialState,
  reducers: {
    setDailyForecast: (state, data: PayloadAction<ForecastData>) => {
      state.error = '';
      state.loading = false;
      state.data = data.payload;
    },
    getDailyForecast: (state) => {
      state.loading = true;
    },
    setError: (state, data: PayloadAction<string>) => {
      state.loading = false;
      state.data = null;
      state.error = data.payload;
    }
  },
})


export const { reducer: dailyForecastReducer, actions } = dailyForecast;

export const { getDailyForecast, setDailyForecast, setError } = actions;