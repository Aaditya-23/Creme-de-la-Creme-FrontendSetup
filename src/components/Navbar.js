import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LOGO from "../assets/images/MyLogo.svg";
import "../assets/css/navbar.css";
import { teal } from "@mui/material/colors";
import { Avatar } from "@mui/material";
import { destroyUser } from "../features/UserSlice";

export default function Navbar() {
  const User = useSelector((state) => state.user.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleRedirect = () => {
    if (pathname !== "/") {
      navigate("/home");
    }
  };

  const handleLogout = () => {
    dispatch(destroyUser());
    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar">
      <div
        className="logo"
        onClick={() => {
          handleRedirect();
        }}
      >
        <img src={LOGO} alt="Logo" />
        <div>crème de la crème</div>
      </div>
      {(User &&
        ((pathname.includes("/user") && (
          <button
            className="login-link common-1 logout"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        )) || (
          <Link to="/user" className="user common-1">
            {(User.avatarURL && (
              <Avatar
                alt={User.name.charAt(0).toUpperCase()}
                src={process.env.REACT_APP_SERVER_URL + User.avatarURL}
                sx={{ width: 56, height: 56 }}
              />
            )) || (
              <Avatar
                alt={User.name.charAt(0).toUpperCase()}
                src={localStorage.getItem("imageURL") || " "}
                sx={{ bgcolor: teal[500], width: 56, height: 56 }}
              />
            )}
          </Link>
        ))) || (
        <Link to="/login" className="login-link common-1">
          Login
        </Link>
      )}
    </div>
  );
}
