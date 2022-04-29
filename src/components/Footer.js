import { Link } from "react-router-dom";
import "../assets/css/footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="pages">
        <Link to="/user/favourites" className="footer-ct">
          favourites
        </Link>
        <Link to="/home" className="footer-ct">
          home
        </Link>
        <Link to="/user/addCourse" className="footer-ct">
          Add Course
        </Link>
      </div>
      <div className="copyright">
        © Crème De La Crème, Inc. All rights reserved.
      </div>
    </footer>
  );
}
