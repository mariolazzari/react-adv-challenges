import React, { useState, useEffect, useMemo, useCallback } from 'react';


const list = [
  {
    "title": "React.memo",
    "description": "Prevents re-rendering of a component unless its props change.",
    "reference": "api"
  },
  {
    "title": "useMemo",
    "description": "Memoizes expensive calculations to prevent re-computation on every render.",
    "reference": "hooks"
  },
  {
    "title": "useCallback",
    "description": "Returns a memoized version of a function that only changes if dependencies change.",
    "reference": "hooks"
  },
  {
    "title": "Context",
    "description": "Shares a global state without passing props manually",
    "reference": "api"
  }
]


const Component = React.memo(function Componebt({ count }) {
  console.log("Rendered Expensive Component");
  return (<p>{count}</p>);
})

function List() {
  const [items] = useState(list)

  const visibleItems = useMemo(() => items?.filter(item => item.reference), [items]);

  return (
    <ul>
      {visibleItems?.map((item, index) => <li key={index}>{item.title}</li>)}
    </ul>
  );
}

function App() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(c => c + 1)
  }, [setCount])

  return (
    <>
      <Component count={count} />
      <List />
      <button onClick={increment}>Increment</button>
    </>
  );
}


export default App;
