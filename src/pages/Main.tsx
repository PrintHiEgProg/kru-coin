import React, { useEffect, useState } from "react";

function Main() {
    const [count, setCount] = useState(() => {
      const savedCount = localStorage.getItem("count");
      return savedCount !== null ? parseInt(savedCount, 10) : 0;
    });

    const [countTrue, setCountTrue] = useState(() => {
      const savedCountTrue = localStorage.getItem("countTrue");
      const lastUpdateTime = localStorage.getItem("lastUpdateTime");

      if (
        savedCountTrue !== null &&
        lastUpdateTime !== null &&
        Date.now() - parseInt(lastUpdateTime, 10) < 24 * 60 * 60 * 1000
      ) {
        return Math.max(parseInt(savedCountTrue, 10), 0);
      } else {
        return 10;
      }
    });

    const [timer, setTimer] = useState(10);
    const [canClick, setCanClick] = useState(true);
    const [isCountingDown, setIsCountingDown] = useState(false);

    useEffect(() => {
      localStorage.setItem("count", count.toString());
      localStorage.setItem("countTrue", countTrue.toString());
      localStorage.setItem("lastUpdateTime", Date.now().toString());

      let interval;

      if (isCountingDown && countTrue === 0) {
        interval = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer > 0) {
              setCountTrue((prevCountTrue) => Math.min(prevCountTrue + 1, 10));
              return prevTimer - 1;
            } else {
              clearInterval(interval);
              setIsCountingDown(false);
              setTimer(10); // Reset timer to 10
              return prevTimer;
            }
          });
        }, 1000);
      } else if (countTrue < 10 && !isCountingDown) {
        interval = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer > 0) {
              setCountTrue((prevCountTrue) => {
                if (prevCountTrue < 10) {
                  return Math.min(prevCountTrue + 1, 10);
                } else {
                  return prevCountTrue;
                }
              });
              return prevTimer - 1;
            } else {
              clearInterval(interval);
              return prevTimer;
            }
          });
        }, 1000);
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [countTrue, isCountingDown]);

    const handleClick = () => {
      if (canClick) {
        setCount(count + 1);

        if (countTrue > 0) {
          setCountTrue(Math.max(countTrue - 1, 0));
        }

        setCanClick(false);
        setTimeout(() => {
          setCanClick(true);
        }, 100);
      }
    };

    useEffect(() => {
      if (countTrue === 0) {
        alert("Скрудж устал 😴");
        setIsCountingDown(true);
      }
    }, [countTrue]);


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
              
        <hr className="coin-progress" style={{ width: countTrue * 2 }} />
        <p className="sum-true">
          <b>{countTrue}</b>
        </p>
      </div>
      
    </div>
  );
}
export default Main;
