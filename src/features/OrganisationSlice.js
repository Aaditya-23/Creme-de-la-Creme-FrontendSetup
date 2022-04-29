import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrganisations = createAsyncThunk(
  "organisations/getOrganisations",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/organisations/list`
    );

    return response.data;
  }
);

const OrganisationSlice = createSlice({
  name: "organisations",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getOrganisations.fulfilled]: (state, action) => {
      return action.payload.organisations;
    },
  },
});

export default OrganisationSlice.reducer;
