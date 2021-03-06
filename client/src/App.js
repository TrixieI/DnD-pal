import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Character from "./components/Character";
import Resources from "./components/Resources";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import Footer from "./components/Footer";
import HallOfFame from "./components/HallOfFame";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <div className="absolute-bg">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/character"
            element={isAuthenticated ? <Character /> : <Navigate to="/" />}
          />
          <Route
            path="/resources"
            element={isAuthenticated ? <Resources /> : <Navigate to="/" />}
          />
          <Route
            path="/fame"
            element={isAuthenticated ? <HallOfFame /> : <Navigate to="/" />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
