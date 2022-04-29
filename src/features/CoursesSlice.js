import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialCriteria = {
  criteria: "relevance",
  sortby: "rating",
  certificate: false,
  langs: [],
  orgs: [],
};

export const getCourses = createAsyncThunk(
  "courses/getCourses",
  async (sortParams = initialCriteria) => {
    sortParams = {
      ...sortParams,
      langs: JSON.stringify(sortParams.langs),
      orgs: JSON.stringify(sortParams.orgs),
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}course/list`,
      { sortParams }
    );
    return response.data;
  }
);

export const fetchCourse = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}course/fetch-course`,
    {
      id,
    }
  );
  return [response.data.course];
};

export const rateCourse = async (courseId, value) => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}course/rate-course`,
    { courseId, value },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};

export const commentCourse = async (body) => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}course/comment-course`,
    {
      ...body,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};

const initialState = { isFetching: true, courses: [] };

const CoursesSlice = createSlice({
  name: "courses",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getCourses.pending]: (state, action) => {
      return { isFetching: true, courses: [] };
    },
    [getCourses.fulfilled]: (state, action) => {
      return { isFetching: false, courses: action.payload.courses };
    },
  },
});

export default CoursesSlice.reducer;
