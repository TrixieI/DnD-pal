import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Character from "./components/Character";
import Resources from "./components/Resources";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/character" element={<Character />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
