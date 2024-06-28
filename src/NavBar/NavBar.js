import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleBoostClick = () => {
    navigate("/boost")
  };

  const handleTaskClick = () => {
    navigate("/task");
  };

  const handleRefLinkClick = () => {
    navigate("/link");
  };

  return (
    <div className="NavBar">
      <div className="nav-bar-btn-box">
        <div className="icon-container" onClick={handleHomeClick}>
          <button className="icon home"></button>
          <p className="icon-description">home</p>
        </div>

        <div className="icon-container" onClick={handleBoostClick}>
          <button className="icon boost"></button>
          <p className="icon-description">boost</p>
        </div>
        <div className="icon-container" onClick={handleTaskClick}>
          <button className="icon task"></button>
          <p className="icon-description">task</p>
        </div>
        <div className="icon-container" onClick={handleRefLinkClick}>
          <button className="icon reflink"></button>
          <p className="icon-description">link</p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
