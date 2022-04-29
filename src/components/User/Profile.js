import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/profile.css";
import { getUpdatedUser } from "../../features/UserSlice";

export default function Profile() {
  const { User } = useSelector((state) => state.user);
  const intialiseState = () => {
    if (User.avatarURL) {
      return `${process.env.REACT_APP_SERVER_URL + User.avatarURL}`;
    }
    return null;
  };
  const [avatarURL, setAvatarURL] = useState(intialiseState());
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(document.querySelector(".user-details"));
    let response = await axios
      .post(
        `${process.env.REACT_APP_API_URL}users/update-user-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);
    if (response.data.isUpdated) dispatch(getUpdatedUser());
  };

  const handleFileChange = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      setAvatarURL(event.target.result);
    };
    if (e.target.files[0]) fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="myProfile">
      <form
        className="user-details"
        encType="multipart/form"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <label className="user-avatar">
          <input
            className="upload-avatar"
            type="file"
            name="userImage"
            onChange={(e) => handleFileChange(e)}
          />
          <div className="avatar-container">
            {(avatarURL && (
              <Avatar
                alt={User.name.charAt(0).toUpperCase()}
                className="avatar"
                src={avatarURL}
                sx={{ width: 76, height: 76 }}
              />
            )) || (
              <Avatar
                className="avatar"
                alt={User.name.charAt(0).toUpperCase()}
                src={localStorage.getItem("imageURL") || " "}
                sx={{
                  bgcolor: teal[500],
                  width: 76,
                  height: 76,
                  textTransform: "capitalize",
                }}
              />
            )}
            <span className="material-icons edit">mode_edit</span>
          </div>
        </label>
        <label className="profile-label">
          Name
          <input
            className="fields"
            type="text"
            name="name"
            defaultValue={User.name}
          />
        </label>
        <label className="profile-label">
          Email
          <input
            disabled
            name="email"
            className="fields"
            type="email"
            defaultValue={User.email}
          />
        </label>
        <label className="profile-label">
          Gender
          <select name="gender" defaultValue={User.gender} className="fields">
            <option value={null}>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={(e) => {
            e.target.classList.add("bttn-toggle");
            setTimeout(() => {
              e.target.classList.remove("bttn-toggle");
            }, 200);
          }}
        >
          Update details
        </button>
      </form>
    </div>
  );
}
