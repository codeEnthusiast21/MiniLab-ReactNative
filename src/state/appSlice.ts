import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    initialized: true,
  },
  reducers: {},
});

export default appSlice.reducer;
