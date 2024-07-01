import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar.js";
import Boost from "./Boost.js";
import Main from "./Main.js";
import Task from "./Task.js";
import RefLink from "./RefLink.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  navigator.vibrate =
    navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;

  const tg = window.Telegram.WebApp;
  const userId = tg.initDataUnsafe.user.id;
  
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });
  const [countBonus, setCountBonus] = useState(() => {
    const savedCountBonus = localStorage.getItem("countBonus");
    return savedCountBonus !== null ? parseInt(savedCountBonus, 10) : 1;
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

  useEffect(() => {
    localStorage.setItem("count", count.toString());
    localStorage.setItem("countTrue", countTrue.toString());
    localStorage.setItem("lastUpdateTime", Date.now().toString());

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setCountTrue((prevCountTrue) => Math.min(prevCountTrue + 1, 10));
          return 10; // Reset timer to 10
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [count, countTrue]);

  const handleClick = () => {
    if (canClick) {
      setCount(count + countBonus);
      if (true) {
        const hapticFeedbackLight = tg.HapticFeedback.impactOccurred("light");
      }
    

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
      const HapticFeedbackError = tg.HapticFeedback.notificationOccurred("warning");
      alert("Scrooge is tired... 😴");
    }
  }, [countTrue]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных (можете заменить этот setTimeout на реальную логику загрузки)
    setTimeout(() => {
      setLoading(false); // После завершения загрузки устанавливаем loading в false
    }, 3000); // Пример: имитация загрузки в течение 3 секунд

    // Здесь можно добавить логику для загрузки данных с сервера или другие операции
  }, []);

  const priceMoreClick = 100

  const moreClicks = () => {
    
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (count >= priceMoreClick) {
      if (window.confirm("here you can buy more clicks in one click 🤑")) {
        setCount(count - priceMoreClick);
        setCountBonus(countBonus * 2);
        alert("thanks for the purchase ✅");
      } 
    } else {
      alert("insufficient funds ❌");
    };
    
  }

  return (
    <div className="App">
      {loading ? (
        <div className="Loading-page">
          <h1 className="title">
            Welcome
            <br />
            Quack Coin!
          </h1>
          <div className="contact"></div>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main
                  count={count}
                  handleClick={handleClick}
                  countTrue={countTrue}
                  canClick={canClick}
                />
              }
            />
              <Route path="/boost" element={<Boost count={count} moreClicks={moreClicks} />} />
            <Route path="/task" element={<Task />} />
            <Route path="/link" element={<RefLink userId={userId} />} />
          </Routes>
          <NavBar />
        </Router>
      )}
    </div>
  );
}

export default App;
