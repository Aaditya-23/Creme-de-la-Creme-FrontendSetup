// TODO Use a password validator.
// TODO Use flash messages.
// TODO Redirect Appropriately.
// TODO Handle the case in which the user already exists and hence sign-up fails.
// TODO Reset the form after submission.
// TODO Try to change the UI of this page.
// TODO Remove the confirmPasswd === Passwd check from the client and move it to the server intead.

import { forwardRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slide, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import "../assets/css/auth.css";
import GoogleOAuth from "./GoogleOAuth";

export default function SignUp() {
  const initialState = {
    status: null,
    errors: null,
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const [response, setResponse] = useState(initialState);
  const [transition, setTransition] = useState(undefined);

  function slideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const cred = {};
    for (let obj of e.target.elements) {
      cred[obj.name] = obj.value;
    }

    const data = await axios
      .post(`${process.env.REACT_APP_API_URL}users/sign-up`, cred)
      .then((response) => response)
      .catch((error) => error);

    function filterErrors() {
      const property = data.data.validation;
      if (property && property.length > 0) {
        return property["0"].message.replace("The string", "Password");
      } else if (data.data.error) {
        return data.data.error[0][1].message;
      }
      return data.data.message;
    }

    setResponse(() => {
      return { status: data.status, errors: filterErrors() };
    });
  };

  useEffect(() => {
    if (response.status === null) return;

    if (response.status === 201) {
      const storage = window.localStorage;
      storage.setItem("newUser", "true");
      navigate("/login", { replace: true });
    }

    setFlash(true);
    setTransition(() => slideTransition);
  }, [response, navigate]);

  return (
    <div className="commonAuth-wrapper">
      <form
        method="POST"
        className="Auth"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <label className="Auth-label">
          Name
          <input type="text" name="name" required />
        </label>
        <label className="Auth-label">
          Email
          <input type="email" name="email" required />
        </label>
        <label className="Auth-label">
          <select defaultValue={"DEFAULT"} name="gender">
            <option value="DEFAULT" disabled>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="Auth-label">
          Password
          <input type="password" name="password" required />
        </label>
        <label className="Auth-label">
          Confirm Password
          <input type="password" name="confirmPassword" required />
        </label>
        <button type="submit">Sign Up</button>
      </form>

      <div className="auth-links">
        have an account? <Link to="/login">sign in</Link>
      </div>

      <div className="auth-jwt">
        or you can login with
        <div className="auth-strategies">
          <GoogleOAuth />
        </div>
      </div>
      {
        <Snackbar
          open={flash}
          autoHideDuration={3000}
          TransitionComponent={transition}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={(reason) => {
            if (reason === "clickaway") return;
            setFlash(false);
          }}
        >
          <Alert severity="error">{response.errors}</Alert>
        </Snackbar>
      }
    </div>
  );
}
