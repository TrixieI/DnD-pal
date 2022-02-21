import Navigation from "./Navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";

const HallOfFame = () => {
  useEffect(() => {
    characters();
  }, []);

  const [data, setData] = useState([]);

  const characters = async () => {
    const data = await axios.get("http://localhost:3001/fame");
    setData(data.data.data);
    console.log(data.data.data);
  };

  return (
    <div>
      <Navigation />
      <div className="fame">
        <h1>Hall of Fame</h1>
        <div className="list">
          {data.player === "Adventurer"
            ? data.map((item, i) => (
                <li
                  className="column"
                  key={i}
                >{`${item.username} ${item.player}`}</li>
              ))
            : data.map((item, i) => (
                <li
                  className="column"
                  key={i}
                >{`${item.username} ${item.player}`}</li>
              ))}
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;
