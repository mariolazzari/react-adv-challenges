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
- 

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
´´´
