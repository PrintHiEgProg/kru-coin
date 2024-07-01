import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const tg = window.Telegram.WebApp;
  const navigate = useNavigate();

  const handleHomeClick = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    navigate("/");
  };

  const handleBoostClick = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    navigate("/boost")
  };

  const handleTaskClick = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    navigate("/task");
  };

  const handleRefLinkClick = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
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
