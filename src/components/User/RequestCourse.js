import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/requestCourse.css";
import { Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const autocompleteStyles = makeStyles((theme) => ({
  root: {
    "& .MuiChip-root": {
      backgroundColor: "grey",
      color: "black",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000",
      opacity: "0",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000",
      opacity: "0",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000",
      opacity: "0",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-outlined": {
      color: "white",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "white",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "white",
    },
  },
}));

export default function RequestCourse() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.organisations);
  const languages = useSelector((state) => state.languages);
  const [langs, setLangs] = useState([]);
  const handleLangChange = (event, value) => {
    setLangs(value);
  };

  const fetchId = (val) => {
    const org = state.filter((orgs) => {
      return orgs.organisation === val;
    });

    return org[0]._id;
  };

  const PostCourse = async (event) => {
    event.preventDefault();
    const cred = new FormData(document.querySelector(".course-form"));
    cred.append("languages", JSON.stringify(langs));

    await axios.post(
      process.env.REACT_APP_API_URL + "course/add",
      cred,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    localStorage.setItem("newCourse", true);
    navigate("/home", { replace: true });
  };

  useEffect(() => {
    const fileinput = document.querySelector(".multipart-input input");
    const filename = document.querySelector(".multipart-input span");

    const changeName = (e) => {
      const element = e.target.files[0];
      if (element) filename.innerHTML = element.name.substring(0, 10) + "...";
    };

    fileinput.addEventListener("change", (e) => {
      changeName(e);
    });

    return () => {
      document.removeEventListener("change", (e) => {
        changeName(e);
      });
    };
  }, []);

  const styleAutocomplete = autocompleteStyles();

  return (
    <div className="requestCourse">
      <form
        id="course-form"
        className="course-form"
        encType="multipart/form-data"
        onSubmit={(event) => {
          PostCourse(event);
        }}
      >
        <label className="common-3">
          course name
          <input name="courseName" type="text" required />
        </label>

        <label className="common-3">
          fee
          <input name="fee" type="number" required min={0} placeholder="INR." />
        </label>

        <label className="common-3">
          duration
          <input
            name="duration"
            min={0}
            type="number"
            required
            placeholder=" Hours"
          />
        </label>

        <label className="common-3">
          Course Link
          <input name="link" type="text" required />
        </label>

        <label className="common-3">
          <select name="learningType" required>
            <option value="self-paced">Self Paced</option>
            <option value="cohort-learning">Cohort Learning</option>
          </select>
        </label>

        <label className="common-3">
          <select name="trial" required>
            <option value="true">Trial Available</option>
            <option value="false">Trial Unavailable</option>
          </select>
        </label>

        <label className="common-3 multipart-input">
          <span>Thumbnail</span>
          <input name="courseImage" type="file" required />
        </label>

        <label className="common-3">
          <Autocomplete
            classes={styleAutocomplete}
            multiple
            limitTags={2}
            onChange={handleLangChange}
            id="languages"
            options={languages}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Languages"
                placeholder="Languages"
                variant="outlined"
              />
            )}
            renderOption={(props, option) => {
              return <span {...props}>{option.nativeName}</span>;
            }}
            fullWidth
          />
        </label>

        <label className="common-3">
          Certificate Available
          <select name="certificateOfCompletion" required>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <label className="common-3">
          Organisation / Source
          <select name="source" className="omp" required>
            {state && (
              <>
                <option value={fetchId("YouTube")}>YouTube</option>
                <option value={fetchId("edX")}>edX</option>
                <option value={fetchId("Udemy")}>Udemy</option>
                <option value={fetchId("Coding Ninjas")}>Coding Ninjas</option>
                <option value={fetchId("Scaler")}>Scaler</option>
                <option value={fetchId("Geeks for Geeks")}>
                  Geeks for Geeks
                </option>
                <option value={fetchId("Others")}>Others</option>
              </>
            )}
          </select>
        </label>

        <label className="common-3 txt-ar">
          Instructors
          <textarea
            name="instructors"
            required
            maxLength={300}
            placeholder="Name of Instructors. Separate each name with a comma"
          ></textarea>
        </label>

        <label className="common-3 txt-ar">
          Topics Covered
          <textarea
            name="syllabus"
            required
            maxLength={400}
            placeholder="Topics covered in this course. Separate each topic with a comma."
          ></textarea>
        </label>

        <label className="common-3 txt-ar">
          Course Description
          <textarea
            name="about"
            required
            maxLength={400}
            placeholder="Describe the course in atmost 400 characters..."
          />
        </label>
      </form>
      <button form="course-form" className="courseform-submit" type="submit">
        Add Course
      </button>
    </div>
  );
}
