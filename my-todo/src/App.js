import React, { useState } from "react";
import "./App.css";
import Todo from "./Todo";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const addATodo = (event) => {
    event.preventDefault();
    console.log("todo added");
    setTodos([inputText, ...todos]);
    setInputText("");
  };

  const onChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="app">
      <h1>Todo app</h1>
      <form>
        <input onChange={onChangeHandler} value={inputText} type="text" />
        <button disabled={!inputText} type="submit" onClick={addATodo}>
          ADD A TODO
        </button>
      </form>

      {todos.map((todo) => (
        <Todo title={todo} />
      ))}
    </div>
  );
}

export default App;
