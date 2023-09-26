import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TemperatureUnitEnum, WeatherData } from "../../types";
import axios from "axios";

const initialState: { loading: boolean, data: WeatherData | null, error: string } = {
  loading: false,
  data: null,
  error: ''
}

type FetchCurrentWeather = {
  city?: string,
  unit?: TemperatureUnitEnum
}

export const fetchCurrentWeather = createAsyncThunk(
  'currentWeather/fetchCurrentWeather',
  async ({ city, unit }: FetchCurrentWeather = {}, thunkApi) => {
    thunkApi.dispatch(getCurrentWeather());

    if (city) {
      try {
        const result = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city || ''}&units=${unit || TemperatureUnitEnum.Metric}&cnt=3&appid=9d47825e8b4e7545203d89968372299c`);

        thunkApi.dispatch(setCurrentWeather(result.data));
      } catch (e: unknown) {
        if (e instanceof Error) {
          thunkApi.dispatch(setError('City not found'));
        }
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit || TemperatureUnitEnum.Metric}&cnt=3&appid=9d47825e8b4e7545203d89968372299c`;

      try {

        const result = await axios.get(apiUrl);

        thunkApi.dispatch(setCurrentWeather(result.data));
      } catch (e) {
        if (e instanceof Error) {
          thunkApi.dispatch(setError('City not found'));
        }
      }

    });
  }
)

const currentWeather = createSlice({
  name: 'currentWeather',
  initialState: initialState,
  reducers: {
    setCurrentWeather: (state, data: PayloadAction<WeatherData>) => {
      state.error = '',
        state.loading = false;
      state.data = data.payload;
    },
    getCurrentWeather: (state) => {
      state.loading = true;
    },
    setError: (state, data: PayloadAction<string>) => {
      state.loading = false;
      state.data = null;
      state.error = data.payload
    }
  },
})


export const { reducer: currentWeatherReducer, actions } = currentWeather;

export const { getCurrentWeather, setCurrentWeather, setError } = actions;