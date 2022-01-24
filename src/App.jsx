import { useState } from "react";

import "./App.css";

function App() {
  const [letter, setLetter] = useState("");

  let words = [`strawberry, transistor, equivalent, eclipse, horizontal`];

  return (
    <div className="App">
      <h2 className="title">Hangman</h2>
    </div>
  );
}

export default App;
