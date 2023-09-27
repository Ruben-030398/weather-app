import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const selectedDateSlice = createSlice({
  name: 'selectedDate',
  initialState: { value: '' },
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

const { reducer: selectedDateReducer, actions } = selectedDateSlice;

const { setSelectedDate } = actions;

export { selectedDateReducer, setSelectedDate }