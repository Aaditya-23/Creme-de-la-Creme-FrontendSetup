import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLanguages = createAsyncThunk(
  "languages/getLanguages",

  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}languages/list`
    );
    return response.data;
  }
);

const LanguagesSlice = createSlice({
  name: "languages",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getLanguages.fulfilled]: (state, action) => {
      return action.payload.languages;
    },
  },
});

export default LanguagesSlice.reducer;
