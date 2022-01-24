import { useState } from "react";

import "./App.css";

function App() {
  const [letter, setLetter] = useState(pickRandomWord());
  const [gameOver, setGameOver] = useState(false);
  const [trial, setTrial] = useState(0);

  const words = [
    "strawberry",
    "transistor",
    "equivalent",
    "eclipse",
    "horizontal",
  ];

  function pickRandomWord(words) {
    const randomWord = Math.floor(Math.random() * words.length);
    return words(randomWord);
  }

  function gameLost() {
    if (trial === 5) return true;
    return false;
  }

  return (
    <div className="App">
      <h2 className="title">Hangman</h2>
    </div>
  );
}

export default App;
