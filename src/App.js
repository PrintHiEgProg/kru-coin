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

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });
  const [countBonus, setCountBonus] = useState(() => {
    const savedCountBonus = localStorage.getItem("countBonus");
    return savedCountBonus !== null ? parseInt(savedCountBonus, 10) : 1;
  });
  const [countTrueMax, setcountTrueMax] = useState(() => {
    const savedcountTrueMax = localStorage.getItem("countTrueMax");
    return savedcountTrueMax !== null ? parseInt(savedcountTrueMax, 10) : 0;
  });
  const [levelMoreClicks, setLevelMoreClicks] = useState(() => {
    const savedLevelMoreClicks = localStorage.getItem("levelMoreClicks");
    return savedLevelMoreClicks !== null
      ? parseInt(savedLevelMoreClicks, 10)
      : 0;
  });
  const [levelMoreEnergy, setLevelMoreEnergy] = useState(() => {
    const savedLevelMoreEnergy = localStorage.getItem("levelMoreEnergy");
    return savedLevelMoreEnergy !== null
      ? parseInt(savedLevelMoreEnergy, 10)
      : 0;
  });
  const [levelTgChannel1, setLevelTgChannel1] = useState(() => {
    const savedLevelTgChannel1 = localStorage.getItem("levelTgChannel1");
    return savedLevelTgChannel1 !== null
      ? parseInt(savedLevelTgChannel1, 10)
      : 0;
  });
  const [levelTgPremium, setlevelTgPremium] = useState(() => {
    const savedLevelTgPremium = localStorage.getItem("levelTgPremium");
    return savedLevelTgPremium !== null ? parseInt(savedLevelTgPremium, 10) : 0;
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
      return countTrueMax;
    }
  });

  const [timer, setTimer] = useState(3);
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
          setCountTrue((prevCountTrue) =>
            Math.min(prevCountTrue + 1, canClick)
          );
          return countTrueMax; // Reset timer to 10
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
      const HapticFeedbackError =
        tg.HapticFeedback.notificationOccurred("warning");
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

  //Tasks
  const TgPremium = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (levelTgPremium === 1) {
      alert("You have already completed this task ✅");
    } else {
      if (
        window.confirm(
          "If you have Telegram premium you get +1000 coins.\nTo execute?"
        )
      ) {
        if (tg.initDataUnsafe.user.isPremium) {
          setCount(count + 1000);
          setlevelTgPremium(levelTgPremium + 1);
          alert("Yoooo!\nCongratulations on buying TG Premium! ⭐️");
        } else {
          alert("Sorry, but you don't have tg premium 😔");
        }
      }
    }
  };

  const TgChannel1 = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const navigate = useNavigate();
    if (levelTgChannel1 === 1) {
      alert("You have already completed this task ✅");
    } else {
      const checkSubsciption = async () => {
        try {
          //endpoint api

          const response = await axios.get("https://api.server.com/check-sub");
          if (response.data.subscribed) {
            setIsSubscribed(true);

            const currentCount =
              parseInt(localStorage.getItem("count"), 10) || 0;

            localStorage.setItem("count", currentCount + 20000);
            alert(
              "спасибо за выполнения задания, нам важно ваше присутствие с нами"
            );
            setLevelTgChannel1(levelMoreEnergy + 1);
          } else {
            if (
              window.confirm(
                "Subscribe to the telegram channel and get +20,000 coins. To execute?"
              )
            ) {
              //выполнение задания

              const handleSubscribe = () => {
                tg.openTelegramLink("https://t.me/deanon_team_blog", "_blank"); //ссылка на тгк
              };
            }
          }
        } catch (error) {
          console.error("watafak", error);
        }
      };
    }
  };

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
