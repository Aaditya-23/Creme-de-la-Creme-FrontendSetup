import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/searchbar.css";

export default function Searchbar() {
  const navigate = useNavigate();
  const [value, setvalue] = useState("");

  return (
    <div className="layer1">
      <input
        className="searchbar-input"
        type="text"
        placeholder="Search for courses..."
        onChange={(e) => setvalue(e.target.value)}
      />
      <button
        className="searchbar-submit"
        type="button"
        onClick={(e) => {
          document.querySelector(".searchbar-input").value = "";
          navigate(`/home?${value}`);
        }}
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}
