import React from "react";
import "./App.css";

function Boost({ count, moreClicks }) {
  return (
    <div className="Boost">
      <h2 className="title">Boost</h2>
      <p className="count-click">{count}</p>
      <div className="catalog">
        <div className="card" onClick={moreClicks}>
          <div className="card-img"></div>
          <div className="card-text">
            <b>more clicks</b>
          </div>
          <hr className="card-hr" />
          <div className="card-footer">
            <div className="card-level">1 lv</div>
            <div className="card-price">100</div>
            <div className="card-money"></div>
          </div>
        </div>
        <div className="card">
          <div className="card-text">
            <b>more enegry</b>
          </div>
          <hr className="card-hr" />
          <div className="card-footer">
            <div className="card-level">1 lv</div>
            <div className="card-price">100</div>
            <div className="card-money"></div>
          </div>
        </div>
        <h4 className="title">factories</h4>
        <div className="card">
          <div className="card-text">
            <b>shoe factory</b>
          </div>
          <hr className="card-hr" />
          <div className="card-footer">
            <div className="card-level">1 lv</div>
            <div className="card-price">100</div>
            <div className="card-money"></div>
          </div>
        </div>
        <div className="card">
          <div className="card-text">
            <b>hotel</b>
          </div>
          <hr className="card-hr" />
          <div className="card-footer">
            <div className="card-level">1 lv</div>
            <div className="card-price">100</div>
            <div className="card-money"></div>
          </div>
        </div>
        <div className="card">
          <div className="card-text">
            <b>bank</b>
          </div>
          <hr className="card-hr" />
          <div className="card-footer">
            <div className="card-level">1 lv</div>
            <div className="card-price">100</div>
            <div className="card-money"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Boost;
