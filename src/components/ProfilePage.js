import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import "../assets/css/profilepage.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="actions">
          <ul className="list">
            <li>
              <div
                onClick={() => {
                  navigate("", { replace: true });
                }}
              >
                Profile
              </div>
            </li>

            <li>
              <div
                onClick={() => {
                  navigate("addcourse", { replace: true });
                }}
              >
                Add Course
              </div>
            </li>

            <li>
              <div
                onClick={() => {
                  navigate("favourites", { replace: true });
                }}
              >
                Favourite Courses
              </div>
            </li>
          </ul>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
