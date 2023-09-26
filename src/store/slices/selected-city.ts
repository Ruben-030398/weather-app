import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const selectedCitySlice = createSlice({
  name: 'selectedCity',
  initialState: { value: '' },
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

const { reducer: selectedCityReducer, actions } = selectedCitySlice;

const { setSelectedCity } = actions;

export { selectedCityReducer, setSelectedCity }