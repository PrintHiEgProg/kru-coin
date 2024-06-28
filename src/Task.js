import React from "react";

function Task() {
  return (
    <div className="Task">
      <h2 className="title">Task</h2>
      <div className="task-card">
        <div className="task-img"></div>
        <div className="task-text">
          <b>task</b>
        </div>
        <hr className="task-hr" />
        <div className="task-footer">
          <div className="task-level">HC</div>
          <div className="task-price">+10000</div>
          <div className="task-money"></div>
        </div>
      </div>
    </div>
  );
}
export default Task;
