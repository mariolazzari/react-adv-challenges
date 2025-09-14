import { useCallback, useState } from "react";
import "./App.css";
import { Component } from "./components/Component";
import { List } from "./components/List";

function App() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, [setCount]);

  return (
    <>
      <Component count={count} />
      <List />
      <button onClick={increment}>Increment</button>
    </>
  );
}

export default App;
