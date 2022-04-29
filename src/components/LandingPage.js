import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "../assets/css/landingpage.css";
import Logo from "../assets/images/MyLogo.svg";
import illustrator from "../assets/images/CourseImages/adobe-illustrator.png";
import xd from "../assets/images/CourseImages/adobe-xd.png";
import ai from "../assets/images/CourseImages/AI.png";
import cpp from "../assets/images/CourseImages/cpp.png";
import excel from "../assets/images/CourseImages/excel.png";
import java from "../assets/images/CourseImages/java.png";
import javascript from "../assets/images/CourseImages/javascript.png";
import react from "../assets/images/CourseImages/React.png";
import videoEditing from "../assets/images/CourseImages/video-editing.png";

export default function LandingPage() {
  return (
    <div className="landingpage">
      <Navbar />

      <div className="div1">
        <div className="searchbar-wrapper">
          <Searchbar />
        </div>
      </div>

      <div className="text">
        join our community to find the best courses out there in no time!
      </div>

      <div className="div2">
        <div className="courses">
          <div className="course-flexbox">
            <img src={illustrator} alt="" />
          </div>
          <div className="course-flexbox">
            <img src={xd} alt="" />
          </div>
          <div className="course-flexbox">
            <img src={ai} alt="" />
          </div>
          <div className="course-flexbox">
            <img src={cpp} alt="" />
          </div>
          <div className="course-flexbox">
            <img src={excel} alt="" />
          </div>
          <div className="course-flexbox">
            <img src={java} alt="" />
          </div>
          <div className="course-flexbox">
            <img src={javascript} alt="" />
          </div>
          <div className="course-flexbox">
            <img src={react} alt="" />
          </div>
          <div className="course-flexbox">
            <img src={videoEditing} alt="" />
          </div>
        </div>
      </div>

      <div className="div3">
        <Link to="/signup" className="to-signup">
          Sign up
        </Link>
        <div className="description">
          Maintaining a current and relevant course catalogue is a never-ending
          endeavour for a single supplier. Find the finest content that meets
          your requirements with our flexible, ever-expanding learning network
          and community assistance.
        </div>
      </div>

      <div className="div4">
        <div className="partition-1">
          <img src={Logo} alt="logo" />
        </div>
        <Link to="home" className="to-home">
          discover
        </Link>
      </div>
      <Footer />
    </div>
  );
}
