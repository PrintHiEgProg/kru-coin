import React from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar.js";
import Boost from "./pages/Boost.js";
import Main from "./pages/Main.js";
import Task from "./pages/Task.js";
import RefLink from "./pages/RefLink.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/boost" element={<Boost />} />
          <Route path="/task" element={<Task />} />
          <Route path="/link" element={<RefLink />} />
        </Routes>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
