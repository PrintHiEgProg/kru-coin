import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar.js";
import Boost from "./Boost.js";
import Main from "./Main.js";
import Task from "./Task.js";
import RefLink from "./RefLink.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const tg = window.Telegram.WebApp;
  const user_id = tg.id
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
    }
  }, [countTrue]);


  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(
      "https://api.telegram.org/bot7018807448:AAFwKDKpTX7QJbh1EXAwCIq7V_0lZiKyzoY/getMe"
    )
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.result.username);
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <div className="App">
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
          <Route path="/boost" element={<Boost count={count} />} />
          <Route path="/task" element={<Task />} />
          <Route path="/link" element={<RefLink user_id={user_id} />} />
        </Routes>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
