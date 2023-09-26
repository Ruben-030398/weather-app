import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const selectedDateSlice = createSlice({
  name: 'selectedDate',
  initialState: { value: 'l2' },
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

const { reducer: selectedDateReducer, actions } = selectedDateSlice;

const { setSelectedDate } = actions;

export { selectedDateReducer, setSelectedDate }