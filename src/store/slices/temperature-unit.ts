import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TemperatureUnitEnum } from "../../types";

const selectedCitySlice = createSlice({
  name: 'temperatureUnit',
  initialState: {type: TemperatureUnitEnum.Imperial},
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnitEnum>) => {
      state.type = action.payload
    },
  },
})

const { reducer: temperatureUnitReducer, actions } = selectedCitySlice;

const { setTemperatureUnit } = actions;

export { temperatureUnitReducer, setTemperatureUnit }