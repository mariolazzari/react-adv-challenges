import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Counter } from "./components/Counter";
import { Countdown } from "./components/Countdown";

function App() {
  const [message, setMessage] = useState("");

  console.log("🔁 App re-rendered");

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
      <Countdown />
    </>
  );
}

export default App;
