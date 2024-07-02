import React from "react";

function Main({count, countTrue, handleClick, canClick}) {
    
  return (
    <div className="Main">
      <h2 className="title">Quack Coin</h2>
      <p className="count-click">{count}</p>
      <div className="coin-btn">
        <button
          className="coin-button"
          onClick={handleClick}
          disabled={!canClick || countTrue === 0}
        >
          ...
        </button>
      </div>
      <div className="box-progress">
        
          <hr className="coin-progress" style={{ width: countTrue * 10 }} />
        

        <p className="sum-true">
          <b>{countTrue}</b>
        </p>
      </div>
    </div>
  );
}
export default Main;
