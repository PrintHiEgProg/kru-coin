import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar.js";
import Boost from "./Boost.js";
import Main from "./Main.js";
import Task from "./Task.js";
import RefLink from "./RefLink.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

function App() {
  const tg = window.Telegram.WebApp;
  const userId = tg.initDataUnsafe.user.id;

  const [count, setCount] = useState(0);
  const [countBonus, setCountBonus] = useState(1);
  const [countTrueMax, setcountTrueMax] = useState(0);
  const [levelMoreClicks, setLevelMoreClicks] = useState(0);
  const [levelMoreEnergy, setLevelMoreEnergy] = useState(0);
  const [levelTgChannel1, setLevelTgChannel1] = useState(0);
  const [levelTgPremium, setlevelTgPremium] = useState(0);
  const [countTrue, setCountTrue] = useState(0);
  const [timer, setTimer] = useState(3);
  const [canClick, setCanClick] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/user-data/${userId}`)
      .then(response => {
        const data = response.data;
        setCount(data.count);
        setCountBonus(data.countBonus);
        setcountTrueMax(data.countTrueMax);
        setLevelMoreClicks(data.levelMoreClicks);
        setLevelMoreEnergy(data.levelMoreEnergy);
        setLevelTgChannel1(data.levelTgChannel1);
        setlevelTgPremium(data.levelTgPremium);
        setCountTrue(data.countTrue);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setCountTrue((prevCountTrue) => Math.min(prevCountTrue + 1, canClick));
          return countTrueMax; // Reset timer to 10
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [count, countTrue, canClick, countTrueMax]);

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

  const saveUserData = () => {
    axios.post(`/api/user-data/${userId}`, {
      count,
      countBonus,
      countTrueMax,
      levelMoreClicks,
      levelMoreEnergy,
      levelTgChannel1,
      levelTgPremium,
      countTrue
    }).catch(error => {
      console.error("Error saving user data:", error);
    });
  };

  useEffect(() => {
    saveUserData();
  }, [count, countBonus, countTrueMax, levelMoreClicks, levelMoreEnergy, levelTgChannel1, levelTgPremium, countTrue]);


  return (
    <div className="App">
      {loading ? (
        <div className="Loading-page">
          <h1 className="title">
            Welcome
            <br />
            Quack Coin!
          </h1>
          <img
            className="loading-wheel"
            src="https://printhiegprog.github.io/loading-wheel.png"
            alt="loading-wheel"
          />
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
            <Route
              path="/boost"
              element={
                <Boost
                  count={count}
                  moreClicks={moreClicks}
                  priceMoreClicks={priceMoreClicks}
                  levelMoreClicks={levelMoreClicks}
                  moreEnergy={moreEnergy}
                  priceMoreEnergy={priceMoreEnergy}
                  levelMoreEnergy={levelMoreEnergy}
                />
              }
            />
            <Route
              path="/task"
              element={<Task TgPremium={TgPremium} TgChannel1={TgChannel1} />}
            />
            <Route path="/link" element={<RefLink userId={userId} />} />
          </Routes>
          <NavBar />
        </Router>
      )}
    </div>
  );
}

export default App;