// TODOS userflash messages.
// TODOS Appropriate redirecting.
// TODOS Decide whether to reset the form after every submission or not.
// TODOS Try to change the ui for this page.

import { Snackbar, Slide } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { initialiseUser } from "../features/UserSlice";
import { useDispatch } from "react-redux";
import GoogleOAuth from "./GoogleOAuth";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const slideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [flash, setflash] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [response, setResponse] = useState({ status: null });

  useEffect(() => {
    const storage = window.localStorage;
    if (storage.getItem("newUser")) {
      setflash(true);
      setTransition(() => slideTransition);
      storage.removeItem("newUser");
    }
  }, []);

  useEffect(() => {
    if (response.status === null) return;

    if (response.status === 201) {
      dispatch(
        initialiseUser({
          token: response.token,
          User: response.user,
        })
      );
      const storage = window.localStorage;
      storage.setItem("loggedin", true);
      navigate("/home", { replace: true });
    }

    setflash(true);
    setTransition(() => slideTransition);
  }, [response, navigate, dispatch]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const cred = {};

    for (let obj of e.target.elements) {
      cred[obj.name] = obj.value;
    }

    const data = await axios
      .post(`${process.env.REACT_APP_API_URL}users/sign-in`, cred)
      .then((response) => response)
      .catch((error) => error);

    setResponse(() => {
      return {
        status: data.status,
        message: data.data.message,
        token: data.data.data.token,
        user: data.data.data.User,
      };
    });
  };

  return (
    <div className="commonAuth-wrapper">
      <form className="Auth" onSubmit={(e) => handleFormSubmit(e)}>
        <label className="Auth-label">
          Email
          <input type="email" name="email" required />
        </label>
        <label className="Auth-label">
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Sign in</button>
      </form>
      <div className="auth-links">
        need an account? <Link to="/signup">sign up</Link>
      </div>
      <div className="auth-jwt">
        or you can sign in with
        <div className="auth-strategies">
          <GoogleOAuth />
        </div>
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
        {(response.message && (
          <Alert severity="error">{response.message}</Alert>
        )) || <Alert severity="success">User Created Successfully</Alert>}
      </Snackbar>
    </div>
  );
}
