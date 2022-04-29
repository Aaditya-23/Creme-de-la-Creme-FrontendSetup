import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { rateCourse, fetchCourse } from "../features/CoursesSlice";
import { bookmarkCourse, getUpdatedUser } from "../features/UserSlice";
import { useDispatch } from "react-redux";
import Discuss from "./Discuss";
import { Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import "../assets/css/coursedetails.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const slideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

export default function CourseDetails() {
  const User = useSelector((state) => state.user.User);
  const languages = useSelector((state) => state.languages);
  const { id } = useParams();
  const [Course, setCourse] = useState([]);
  const [langs, setLangs] = useState([]);
  const [flash, setflash] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);

  const CopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setflash(true);
    setTransition(() => slideTransition);
  };

  useEffect(() => {
    async function getCourse() {
      const course = await fetchCourse(id);
      setCourse(course);
    }
    getCourse();
  }, [id]);

  useEffect(() => {
    if (Course.length === 0) return;
    const rating =
      Course[0].rating[JSON.parse(localStorage.getItem("User"))._id];

    if (rating) {
      setValue(rating);
    }

    let cLangs = "";
    for (let lang of languages) {
      if (Course[0].languages.includes(lang.code)) {
        cLangs += ", " + lang.nativeName;
      }
    }
    setLangs(cLangs.substring(2));
  }, [Course, languages]);

  return (
    <>
      {Course.map((Course, i) => {
        const isFavourite = () => {
          for (let fav of User.favourites) {
            if (fav._id === Course._id) return true;
          }
          return false;
        };
        return (
          <div key={i} className="details-page">
            <div className="course-details">
              <div className="extras">
                <a className="course-link" href={"http://" + Course.link}>
                  Course Link
                </a>
                <div className="share" onClick={CopyToClipboard}>
                  Share
                  <span className="material-icons">share</span>
                </div>
              </div>

              <div className="caution">
                <span className="material-icons">info</span>
                Course price may vary from time to time.
              </div>
              <div className="field-1">
                <div className="course-details-image">
                  <img
                    src={process.env.REACT_APP_SERVER_URL + Course.imageURL}
                    alt="Course preview"
                  />
                </div>
                <div className="field-2">
                  <div className="course-name">
                    {Course.courseName}

                    {(isFavourite() && (
                      <span
                        onClick={async (e) => {
                          await bookmarkCourse(e, Course._id, true);
                          dispatch(getUpdatedUser());
                        }}
                        className="material-icons favourite"
                      >
                        bookmark
                      </span>
                    )) || (
                      <span
                        onClick={async (e) => {
                          await bookmarkCourse(e, Course._id, true);
                          dispatch(getUpdatedUser());
                        }}
                        className="material-icons"
                      >
                        bookmark
                      </span>
                    )}
                  </div>
                  <div className="organisation">
                    <img
                      src={`${
                        process.env.REACT_APP_SERVER_URL + Course.source.logoURL
                      }`}
                      alt="Organisation logo"
                    />
                    <div>{Course.source.organisation}</div>
                  </div>
                  <div className="rating">
                    {Course.totalRating || 0}
                    <Rating
                      name="read-only"
                      size="medium"
                      style={{ color: "#e49f3a" }}
                      value={Course.totalRating || 0}
                      precision={0.5}
                      readOnly
                      emptyIcon={
                        <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="field-3">
                <div className="info-table common-table">
                  <div className="table-row">
                    <i className="info-icons fas fa-money-check-alt"></i>
                    <div className="info">₹ {Course.fee}</div>
                  </div>
                  <div className="table-row">
                    <i className="info-icons far fa-clock"></i>
                    <div className="info">{Course.duration} hours</div>
                  </div>
                  <div className="table-row">
                    <i className="info-icons material-icons">
                      insert_drive_file
                    </i>
                    <div className="info">
                      {(Course.certificateOfCompletion &&
                        "Certificate Available") ||
                        "Certificate Not Available"}
                    </div>
                  </div>
                  <div className="table-row">
                    <span className="info-icons material-icons">speed</span>
                    <div className="info">{Course.learningType}</div>
                  </div>
                  <div className="table-row">
                    <span className="info-icons material-icons">language</span>
                    <div className="info langs">{langs}</div>
                  </div>
                </div>
                <div className="syllabus common-table">
                  {Course.syllabus.map((point, i) => {
                    return (
                      <div key={i} className="syllabus-point">
                        <span className="material-icons">task_alt</span>
                        {point}
                      </div>
                    );
                  })}
                </div>
                <div className="instructors common-table">
                  <div className="instructors-heading">
                    <span className="material-icons">school</span>Instructors
                  </div>
                  {Course.instructors.map((instructor, i) => {
                    return <div key={i}>{instructor}</div>;
                  })}
                </div>
              </div>

              <div className="field-4">
                <span className="material-icons">info</span>
                {(Course.freeTrial && "free trial available") ||
                  "trial not available"}
              </div>

              <div className="field-5">
                <div className="legend">About</div>
                <div className="about">{Course.about}</div>
              </div>

              <div className="rate-course">
                Rate this course
                <Rating
                  className="stars"
                  name="hover-feedback"
                  size="large"
                  style={{ color: "#e49f3a" }}
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    if (newValue > 0 && newValue <= 5) {
                      setValue(newValue);
                      rateCourse(Course._id, newValue);
                    }
                  }}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.3, color: "#e49f3a" }}
                      fontSize="inherit"
                    />
                  }
                />
              </div>

              <Discuss />
            </div>
            <Snackbar
              open={flash}
              autoHideDuration={3000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              TransitionComponent={transition}
              onClose={(reason) => {
                if (reason === "clickaway") return;
                setflash(() => false);
              }}
            >
              <Alert severity="success">Link Copied to Clipboard</Alert>
            </Snackbar>
          </div>
        );
      })}
    </>
  );
}
