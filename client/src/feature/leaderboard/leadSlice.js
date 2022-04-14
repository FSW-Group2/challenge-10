import { createSlice } from "@reduxjs/toolkit";

export const leadSlice = createSlice({
  name: "lead",
  initialState: [
    {
      username: "Salman",
      email: "salman.faris.siddiq@gmail.com",
      gender: "men",
      score: 0,
    },
  ],
  reducers: {
    updateScore: (state, action) => {
      const score = action.payload.score;
      const { selectedIndex } = action.payload;
      state.splice(selectedIndex, 1, score);
    },
  },
});

export const { updateScore } = leadSlice.actions;

export default leadSlice.reducer;
