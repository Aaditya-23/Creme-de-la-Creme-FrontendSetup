import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import Login from "./Login";
import NoMatch from "./NoMatch";
import ProfilePage from "./ProfilePage";
import SignUp from "./SignUp";
import CourseDetails from "./CourseDetails";

import Profile from "./User/Profile";
import RequestCourse from "./User/RequestCourse";
import FavouriteCourses from "./User/FavouriteCourses";

import { useDispatch, useSelector } from "react-redux";
import { getOrganisations } from "../features/OrganisationSlice";
import { getUpdatedUser } from "../features/UserSlice";
import { getLanguages } from "../features/LanguagesSlice";

function Redirect() {
  return <Navigate replace to="/login" />;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganisations());
    dispatch(getUpdatedUser());
    dispatch(getLanguages());
  }, [dispatch]);

  const { token } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={(!token && <Redirect />) || <HomePage />} />
      <Route
        path="/user/*"
        element={(!token && <Redirect />) || <ProfilePage />}
      >
        <Route path="" element={<Profile />} />
        <Route path="addcourse" element={<RequestCourse />} />
        <Route path="favourites" element={<FavouriteCourses />} />
      </Route>
      <Route
        path="/details/:id"
        element={(!token && <Redirect />) || <CourseDetails />}
      />
      <Route
        path="/login"
        element={(token && <Navigate replace to="/home" />) || <Login />}
      />
      <Route
        path="/signup"
        element={(token && <Navigate replace to="/home" />) || <SignUp />}
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
