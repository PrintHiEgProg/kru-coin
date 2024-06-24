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
      <br />
      <div className="nav-bar-btn-box">
        <div className="icon-container" onClick={handleHomeClick}>
          <div className="icon home"></div>
          <p className="icon-description">home</p>
        </div>
        <div className="icon-container" onClick={handleBoostClick}>
          <div className="icon boost"></div>
          <p className="icon-description">boost</p>
        </div>
        <div className="icon-container" onClick={handleTaskClick}>
          <div className="icon task"></div>
          <p className="icon-description">task</p>
        </div>
        <div className="icon-container" onClick={handleRefLinkClick}>
          <div className="icon reflink"></div>
          <p className="icon-description">link</p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
