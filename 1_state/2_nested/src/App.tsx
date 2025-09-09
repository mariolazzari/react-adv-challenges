import "./App.css";
import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Counter } from "./components/Counter";

function App() {
  const [message, setMessage] = useState("");

  return (
    <>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message"
      />

      <Dashboard>
        <Counter />
      </Dashboard>
    </>
  );
}

export default App;
