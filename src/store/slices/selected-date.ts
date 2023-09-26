import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const selectedDateSlice = createSlice({
  name: 'selectedDate',
  initialState: Date.now(),
  reducers: {
    setSelectedDate: (state, action: PayloadAction<number>) => {
      state = action.payload
    },
  },
})

const { reducer: selectedDateReducer, actions } = selectedDateSlice;

const { setSelectedDate } = actions;

export { selectedDateReducer, setSelectedDate }