import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
const letters = "abcdefghijklmnopqrstuvwxyz";

const words = [
  "strawberry",
  "transistor",
  "equivalent",
  "eclipse",
  "horizontal",
];
console.log(words);

function pickRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

console.log(pickRandomWord);

export default function App() {
  const [word, setWord] = useState(pickRandomWord());

  console.log(word);

  // we need to keep track of guesses
  const [guesses, setGuesses] = useState([]);

  // These things we can derive:
  // an incorrect guess is a guess that's not in the word
  const wrongGuesses = guesses.filter((guess) => !word.includes(guess));
  // a correct guess is a guess that it's in the word
  const rightGuesses = guesses.filter((guess) => word.includes(guess));

  // lives is 6 minus the wrong guesses
  const lives = 6 - wrongGuesses.length;

  // we lose when we have no more lives
  const lost = lives === 0;

  // we win when every character in the word has been guessed
  const won = word.split("").every((char) => rightGuesses.includes(char));

  function reset() {
    setGuesses([]);
    setWord(pickRandomWord());
  }

  // Essential:

  useEffect(() => {
    if (lost || won) return;

    const listener = (e) => {
      // only letters can be gussed　✅
      const guess = e.key.toLowerCase();
      if (!letters.includes(guess)) return;

      // only new guesses count
      if (guesses.includes(guess)) return;

      // add new guess to state
      setGuesses([...guesses, guess]);
    };
    // we can guess by typing
    // each character typed is guess
    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, [guesses, lost, won]);

  // Nice to have:
  // when the game ends, we can restart it by pressing a button
  // a drawing of a hangman is shown
  // when losing, characters not guessed should be displayed in red in the word

  return (
    <div className="App">
      <div>
        <h2 className="title">Hangman</h2>
        <div className="Image">
          <img
            src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/001/955/original/hangman.png"
            alt="hang"
          />
        </div>
      </div>

      {/* // the word should be displayed on the screen */}
      {/* // any character not yet guessed should be shown as an underscore */}
      <div className="word">
        {word.split("").map((char, index) => (
          <span key={index}>{rightGuesses.includes(char) ? char : "_"}</span>
        ))}
      </div>
      <p>Wrong guesses: {wrongGuesses}</p>
      <p>Lives: {lives}</p>

      {lost ? (
        <div>
          <p>You lost 🤕</p>
          <p>The word was: {word}</p>
          <button onClick={reset}>RESET</button>
        </div>
      ) : null}

      {won ? (
        <div>
          <p>You won! 🎉</p>
          <button className="reset" onClick={reset}>
            RESET
          </button>
        </div>
      ) : null}
    </div>
  );
}
