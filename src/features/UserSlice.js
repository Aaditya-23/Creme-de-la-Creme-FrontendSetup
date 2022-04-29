import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const storage = window.localStorage;

const initialState = {
  token: storage.getItem("token"),
  User: JSON.parse(storage.getItem("User")),
};

export const getUpdatedUser = createAsyncThunk(
  "user/getUpdatedUser",
  async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/get-user`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storage.getItem("token")}`,
        },
      }
    );

    return response.data;
  }
);

export const bookmarkCourse = async (e, courseId, boolean) => {
  if (boolean) {
    e.target.classList.toggle("favourite");
  }

  await axios.post(
    `${process.env.REACT_APP_API_URL}/users/toggle-favourites`,
    { courseId },
    { headers: { Authorization: `Bearer ${storage.getItem("token")}` } }
  );
  return true;
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    initialiseUser: (state, action) => {
      state.token = action.payload.token;
      state.User = action.payload.User;
      storage.setItem("token", state.token);
      storage.setItem("User", JSON.stringify(state.User));
    },
    destroyUser: (state, action) => {
      storage.clear();
      return { toke: null, User: null };
    },
  },

  extraReducers: {
    [getUpdatedUser.fulfilled]: (state, action) => {
      state.User = action.payload.User;
      storage.setItem("User", JSON.stringify(state.User));
    },
  },
});

export const { initialiseUser, destroyUser } = userSlice.actions;

export default userSlice.reducer;
