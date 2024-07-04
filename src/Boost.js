import React from "react";


//Boosts
const priceMoreClicks = 1;
const moreClicks = () => {
  const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
  if (levelMoreClicks === 10) {
    alert("Max level 🔝");
  } else {
    if (
      window.confirm("Here you can buy more clicks in one click 🤑.\nBuy it?")
    ) {
      if (count >= priceMoreClicks) {
        setCount(count - priceMoreClicks);
        setCountBonus(countBonus * 2);
        setLevelMoreClicks(levelMoreClicks + 1);
        alert("Thanks for the purchase ✅");
      } else {
        alert("Insufficient funds ❌");
      }
    }
  }
};

const priceMoreEnergy = 10;
const moreEnergy = () => {
  const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
  if (levelMoreEnergy === 7) {
    alert("Max level 🔝");
  } else {
    if (window.confirm("Here you can buy more energy.\nBuy it?")) {
      if (count >= priceMoreEnergy) {
        setCount(count - priceMoreEnergy);
        setCountTrue(countTrue + 1000);
        setcountTrueMax(countTrueMax + 1000);
        setLevelMoreEnergy(levelMoreEnergy + 1);
        alert("Thanks for the purchase ✅");
      } else {
        alert("Insufficient funds ❌");
      }
    }
  }
};

function Boost({
  count,
  moreClicks,
  priceMoreClicks,
  levelMoreClicks,
  moreEnergy,
  priceMoreEnergy,
  levelMoreEnergy,
}) {
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
            <div className="card-level">{levelMoreClicks} lv</div>
            <div className="card-price">{priceMoreClicks}</div>
            <div className="card-money"></div>
          </div>
        </div>
        <div className="card" onClick={moreEnergy}>
          <div className="card-text">
            <b>more enegry</b>
          </div>
          <hr className="card-hr" />
          <div className="card-footer">
            <div className="card-level">{levelMoreEnergy} lv</div>
            <div className="card-price">{priceMoreEnergy}</div>
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
