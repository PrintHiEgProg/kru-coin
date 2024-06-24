import React from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar.tsx";
import Boost from "./pages/Boost.tsx";
import Main from "./pages/Main.tsx";
import Task from "./pages/Task.tsx";
import RefLink from "./pages/RefLink.tsx";
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
