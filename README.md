# React: Advanced Code Challenges

## Thinking in React: state updates and rerenders

### App is slow

#### Unnecessary re-renders

- Inefficient list rendering
- Expensive calculations
- Complex logic and stete lifted too high

#### Anti-patterns

- Components update and lifecycle
- Memoization
- Advanced React patterns

### Nested components or passing props?

#### Composition

- Fundamental design concept
- Nesting components and passing props to children

```tsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  // 🔁 Changing message re-renders everything — even the Counter unnecessarily
  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <Dashboard count={count} setCount={setCount} />
    </div>
  );
}

function Dashboard({ count, setCount }) {
  console.log('🔁 Dashboard re-rendered');
  return (
    <div>
      <h2>Dashboard</h2>
      <Counter count={count} setCount={setCount} />
    </div>
  );
}

function Counter({ count, setCount }) {
  console.log('🔁 Counter re-rendered');
  return (
    <button onClick={() => setCount(count + 1)}>Count: {count}</button>
  );
}

export default App
```

```tsx
import { useState } from 'react';

function Dashboard({ children }) {
  console.log('🔁 Dashboard re-rendered');
  return (
    <div>
      {children}
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  console.log('🔁 Counter re-rendered');
  return (
    <button onClick={() => setCount(count + 1)}>Count: {count}</button>
  );
}

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
```

### Avoiding unnecessary re-renders

```tsx
import { useState } from 'react';

function Dashboard({ children }) {
  console.log('🔁 Dashboard re-rendered');
  return (
    <div>
      {children}
    </div>
  );
}

function Counter() {

  console.log('🔁 Counter re-rendered');
  return (
    <button onClick={() => setCount(count + 1)}>Count: {count}</button>
  );
}

function App() {

  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
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
```

```tsx
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

export default App
```

### Identify bottlenecks

- Too much global state and props drilling
- Complex logic inside render
- Expensive calculations
- Complex logic and state lifted too high

## Component configuration and lifecycle

### Preventing useEffect infinite loop

- Use conditional checks
- Use setState(prev =>...)
- Use dependency list carefully
- Momoize components with useCallback and useMemo

```tsx
import { useEffect, useState } from "react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <>
      <h2>Time left: {timeLeft}</h2>
    </>
  );
}
```

### Overcome use of useEffect

```tsx
import React, { useEffect, useState, useMemo } from 'react';

function UserProfile({ first, last, theme }) {
  const [data, setData] = useState({ first: null, last: null });
  const [fullName, setFullName] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);


  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e)
    }
  };


  useEffect(() => {
    fetchData(); // no error handling!
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count])

  const profile = useMemo(() => {
    return data.name + ", " + data.first
  }, [data])


  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Hello, {fullName}!</h1>
      <button onClick={() => setClickCount((c) => c + 1)}>
        Clicked {clickCount} times
      </button>
      {profile && (
        <div>
          <p>Email: {profile.email}</p>
          <p>Bio: {profile.bio}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
```

## Memoization in React

### Maximize performance

- Unnecessary re-renders
- Expensive calculations
- Complex logic

```tsx
const component = React.memo(function Component({title}){
  return <h1>{title}</h1>
})

const flteredList = useMemo(() => {
  return items.filter(item => item.visible)
}, [items])

const onClick = useCallback(() => {
  console.log("onClick")
}, [items])
```

### Avoiding expensive calculations

[Built in hooks](https://react.dev/reference/react/hooks)

## Avanced React patterns

### Overcoming props drilling

#### Props drilling

Passing props between different layers of components

- Tight coupling
- Hard to read
- Difficult to update

### Lifting state up with useContext

[useContext](https://react.dev/reference/react/useContext)

### Managing multiple states with useReducer

[useReducer](https://react.dev/reference/react/useReducer)

### Custom hooks

```tsx
export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("Component must be wrapped into DashboardProvider");
  }

  return ctx;
};
```

## Data fetching

### useEffect

[useEffect](https://react.dev/reference/react/useEffect)

### Connect external system

## Debouncing and throttling