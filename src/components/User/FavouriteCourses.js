import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUpdatedUser, bookmarkCourse } from "../../features/UserSlice";
import { Backdrop, CircularProgress, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

export default function FavouriteCourses() {
  const { favourites } = useSelector((state) => state.user.User);
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const handleClose = () => {
    setopen(false);
  };

  const rateCourse = (rating) => {
    let sum = 0;
    let len = 0;
    for (let id in rating) {
      sum += rating[id];
      len++;
    }
    return parseFloat((sum / len).toFixed(1)) || 0;
  };

  return (
    <div className="courses-container">
      {favourites.map((course, i) => {
        const rating = rateCourse(course.rating);
        return (
          <div key={i} className="course">
            <div className="crse-content">
              <div className="f1">
                <div className="crse-name">{course.courseName}</div>
                <span
                  data-id={course._id}
                  onClick={async (e) => {
                    setopen(true);
                    if (await bookmarkCourse(e, course._id, false))
                      setopen(false);
                    dispatch(getUpdatedUser());
                  }}
                  className="material-icons bookmark favourite"
                >
                  bookmark
                </span>
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
                  {rating}
                  <Rating
                    name="read-only"
                    size="medium"
                    style={{ color: "#e49f3a" }}
                    value={rating}
                    precision={0.5}
                    readOnly
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
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
                <div className="crse-fee">${course.fee}</div>
              </div>

              <div className="crse-certificate">
                <i className="material-icons">insert_drive_file</i>
                Certificate Included
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {favourites.length === 0 && (
        <h2 style={{ color: "white" }}>
          You have not bookmarked any courses yet.
        </h2>
      )}
    </div>
  );
}
