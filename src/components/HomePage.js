import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getUpdatedUser, bookmarkCourse } from "../features/UserSlice";
import { Backdrop, CircularProgress, Rating } from "@mui/material";
import { Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import StarIcon from "@mui/icons-material/Star";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import NewFilters from "./NewFilters";
import { forwardRef, useEffect, useState } from "react";

import "../assets/css/homepage.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const slideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

export default function HomePage() {
  const { isFetching, courses } = useSelector((state) => state.courses);

  const { User } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const searchQuery = useLocation();

  const [flash, setflash] = useState({ value: false, message: null });
  const [transition, setTransition] = useState(undefined);
  const [open, setopen] = useState(false);
  const handleClose = () => {
    setopen(false);
  };

  useEffect(() => {
    setopen(isFetching);
  }, [isFetching]);

  useEffect(() => {
    if (localStorage.getItem("loggedin")) {
      setflash({ value: true, message: "Logged In" });
      setTransition(() => slideTransition);
      localStorage.removeItem("loggedin");
    } else if (localStorage.getItem("newCourse")) {
      setflash({ value: true, message: "Course added successfully" });
      setTransition(() => slideTransition);
      localStorage.removeItem("newCourse");
    }
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <div className="div1">
        <div className="searchbar-wrapper">
          <Searchbar />
        </div>
      </div>
      <NewFilters />
      <div className="courses-container">
        {(!isFetching && courses.length === 0 && (
          <div className="no-results">No Courses Found</div>
        )) ||
          courses.map((course, i) => {
            const isFavourite = () => {
              for (let fav of User.favourites) {
                if (fav._id === course._id) return true;
              }
              return false;
            };
            if (
              !course.courseName.includes(
                searchQuery.search.substring(1).toLowerCase()
              )
            )
              return null;
            return (
              <div key={i} className="course">
                <div className="crse-content">
                  <div className="f1">
                    <div className="crse-name">{course.courseName}</div>
                    {(isFavourite() && (
                      <span
                        onClick={async (e) => {
                          await bookmarkCourse(e, course._id, true);
                          dispatch(getUpdatedUser());
                        }}
                        className="material-icons favourite"
                      >
                        bookmark
                      </span>
                    )) || (
                      <span
                        onClick={async (e) => {
                          await bookmarkCourse(e, course._id, true);
                          dispatch(getUpdatedUser());
                        }}
                        className="material-icons"
                      >
                        bookmark
                      </span>
                    )}
                  </div>
                  <div className="f2">
                    <img
                      className="org-logo"
                      src={`${
                        process.env.REACT_APP_SERVER_URL + course.source.logoURL
                      }`}
                      alt="Organisation logo"
                    />
                    {course.source.organisation}
                  </div>
                  <div className="f3">
                    <div className="crse-rating">
                      {course.totalRating || 0}
                      <Rating
                        name="read-only"
                        size="medium"
                        sx={{ color: "#e49f3a" }}
                        value={course.totalRating || 0}
                        precision={0.5}
                        readOnly
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.6 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </div>
                    <div className="crse-duration">
                      <i className="fas fa-clock"></i>
                      {course.duration} hours
                    </div>
                  </div>

                  <div className="f4">
                    <div className="crse-type">
                      <span className="material-icons">speed</span>
                      {course.learningType}
                    </div>
                    <div className="crse-fee">INR. {course.fee}</div>
                  </div>

                  <div className="crse-certificate">
                    <i className="material-icons">insert_drive_file</i>
                    {(course.certificateOfCompletion &&
                      "Certificate Available") ||
                      "Certificate Not Available"}
                  </div>

                  <div className="crse-extras">
                    <a className="crse-links" href={`https://${course.link}`}>
                      Go
                    </a>
                    <Link className="crse-links" to={`/details/${course._id}`}>
                      View details
                    </Link>
                  </div>
                </div>
                <img
                  className="course-img"
                  src={process.env.REACT_APP_SERVER_URL + course.imageURL}
                  alt="c1"
                />
              </div>
            );
          })}
      </div>
      <Snackbar
        open={flash.value}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={transition}
        onClose={(reason) => {
          if (reason === "clickaway") return;
          setflash((prev) => ({ ...prev, value: false }));
        }}
      >
        <Alert severity="success">{flash.message}</Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
