import { useContext, memo } from 'react';
import { DashboardContext } from './context';
import { styles, navLinks } from "./dashboardConfig"


const ToolBar = memo(function ToolBar() {
  const { state: { count, time } } = useContext(DashboardContext)
  return (<div style={styles.toolbar}>
    <strong>📈 Dashboard</strong>
    <div>
      <span style={{ marginRight: '20px' }}>🕒 {time}</span>
      <span>⏳ Countdown: {count}s</span>
    </div>
  </div>)
})


const Sidebar = memo(function Sidebar() {
  return (<div style={styles.sidebar}>
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {navLinks.map((link, index) => (
          <li key={index}>
            <a href={link.href} style={{ color: '#ccc', textDecoration: 'none' }}>
              {link.icon} {link.label}
            </a>
          </li>
        ))}
      </ul>

    </nav>
  </div>)
})

const ItemList = memo(function ItemList() {
  const { state: { items } } = useContext(DashboardContext)
  return (
    <div style={styles.card}>
      <h3>📝 Todo</h3>
      <ul style={{ paddingLeft: '20px', height: '80px', overflowY: 'auto' }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>{item}</li>
        ))}
      </ul>
    </div>
  )
})

function App() {
  const { dispatch, state: { message } } = useContext(DashboardContext)
  return (
    <>
      <ToolBar />
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.inputGroup}>
          <input
            value={message}
            onChange={(e) => dispatch({ type: "SET_MESSAGE", payload: e.target.value })}
            placeholder="Add a task..."
            style={styles.input}
          />
          <button style={styles.button} onClick={() => dispatch({ type: "ADD_ITEM" })}>Add</button>
        </div>
        <ItemList />
      </div>
    </>
  );
}

export default App;
