import { useState, memo } from 'react';

const Dashboard = memo(function Dashboard({ children }) {
  console.log('🔁 Dashboard re-rendered');
  return (
    <div>
      {children}
    </div>
  );
})

const Counter = memo(function Counter() {
  console.log('🔁 Counter re-rendered');
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Count: {count}</button>
  );
})

function App() {
  const [message, setMessage] = useState('');
  console.log('🔁 App re-rendered');
  // 🔁 Changing message re-renders everything — even the Counter unnecessarily
  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <Dashboard>
        <Counter />
      </Dashboard>
    </div>
  );
}


export default App