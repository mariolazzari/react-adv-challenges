import { memo, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Counter } from "./components/Counter";

const DashboardMemo = memo(Dashboard);
const CounterMemo = memo(Counter);

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
      <DashboardMemo>
        <CounterMemo />
      </DashboardMemo>
    </>
  );
}

export default App;
