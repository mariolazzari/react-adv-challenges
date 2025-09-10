import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  console.log("🔁 Counter re-rendered");
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
