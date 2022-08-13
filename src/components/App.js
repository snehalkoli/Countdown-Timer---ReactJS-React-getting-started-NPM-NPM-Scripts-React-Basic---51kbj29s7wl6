import React, { Component, useState, useEffect } from "react";
import '../styles/App.css';

const App = () => {
  const [timerValue, setTimerValue] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const validateInput = (input) => {
    const pattern = /^(\d)*(\.)?([0-9]{2})?$/;
    if (!pattern.test(input)) {
      return 0;
    }
    return Math.floor(input);
  }

  const startTimer = (e) => {
    if (e.key === 'Enter') {
      const VALID_INPUT = validateInput(e.target.value);
      if (VALID_INPUT === 0) {
        setTimerValue(0);
        return;
      };
      setTimerValue(VALID_INPUT);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(0);
      }
      const newIntervalId = setInterval(() => {
        setTimerValue(prevCount => prevCount - 1);
      }, 1000);
      setIntervalId(newIntervalId);
    }
  }

  useEffect(() => {
    if (timerValue < 1) {
      clearInterval(intervalId);
    }
  }, [timerValue])

  return (
    <div className="wrapper">
      <div id="whole-center">
        <h1>
          Reverse countdown for<input id="timeCount" onKeyDown={startTimer} /> sec.
        </h1>
      </div>
      <div id="current-time">{timerValue}</div>
    </div>
  )
}


export default App;
