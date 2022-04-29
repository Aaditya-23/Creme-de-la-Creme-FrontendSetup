import axios from "axios";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initialiseUser } from "../features/UserSlice";

const style = {
  backgroundColor: "transparent",
  fontSize: "1.5rem",
  color: "purple",
  border: "none",
};

export default function GoogleOAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const GoogleSuccess = async (response) => {
    const token = response?.tokenId;
    localStorage.setItem("imageURL", response.profileObj?.imageUrl);
    const data = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/socialAuth`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(
      initialiseUser({ token: data.data.data.token, User: data.data.data.User })
    );

    if (data.statusText === "OK") {
      localStorage.setItem("loggedin", true);
      navigate("/home", { replace: true });
    }
  };

  const GoogleFailure = async (response) => {
    console.log(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId="574401508017-vcffvmnik3j9tpnfo9t7ctoualkiktb8.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={style}
          >
            <i className="fab fa-google"></i>
          </button>
        )}
        onSuccess={GoogleSuccess}
        onFailure={GoogleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
