import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Footer />
    </div>
  );
}

export default App;
