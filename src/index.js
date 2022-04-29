import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import UserReducer from "./features/UserSlice";
import CourseReducer from "./features/CoursesSlice";
import OrganisationReducer from "./features/OrganisationSlice";
import LanguageReducer from "./features/LanguagesSlice";
const store = configureStore({
  reducer: {
    user: UserReducer,
    courses: CourseReducer,
    organisations: OrganisationReducer,
    languages: LanguageReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
