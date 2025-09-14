import { useState, Profiler } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ margin: '10px' }}>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>➕</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div >
  );
}

function App() {
  const onRender = (id, phase, actualDuration) => {
    console.log(`[Profiler] ${id} ${phase} phase took ${actualDuration.toFixed(2)}ms`);
  };

  return (
    <div>
      <h1>Multi Counter App</h1><hr />
      <Profiler id="Counters" onRender={onRender}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Counter />
          <Counter />
          <Counter />
        </div>
      </Profiler>
    </div>
  );
}

export default App;
