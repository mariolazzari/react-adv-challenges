import "./App.css";
import { useState } from "react";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  // 🔁 Changing message re-renders everything — even the Counter unnecessarily
  return (
    <div>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <Dashboard count={count} setCount={setCount} />
    </div>
  );
}

export default App;
