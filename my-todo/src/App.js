import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const addATodo = () => {
    console.log("todo added");

    setTodos([...todos, inputText]);
  };

  const onChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="app">
      <h1>Todo app</h1>
      <input onChange={onChangeHandler} value={inputText} type="text" />
      <button onClick={addATodo}>ADD A TODO</button>
    </div>
  );
}

export default App;
