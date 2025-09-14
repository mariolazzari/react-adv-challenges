import { memo, useContext } from 'react';
import { useDashboardContext, useToolbarContext } from "./context"
import { styles, navLinks } from "./dashboardConfig"


const ToolBar = memo(function ToolBar() {
  const { count, time } = useToolbarContext()
  return (<div style={styles.toolbar} >
    <strong>📈 Dashboard</strong>
    <div>
      <span style={{ marginRight: '20px' }}>🕒 {time}</span>
      <span>⏳ Countdown: {count}s</span>
    </div>
  </div >)
})


const Sidebar = memo(function Sidebar() {
  return (<div style={styles.sidebar} >
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
  </div >)
})

const ItemList = memo(function ItemList() {
  const { items } = useDashboardContext()
  return (<div style={styles.card}>
    <h3>📝 Todo</h3>
    <ul style={{ paddingLeft: '20px', height: '80px', overflowY: 'auto' }}>
      {items.map((item, index) => (
        <li key={index} style={{ marginBottom: '5px' }}>{item}</li>
      ))}
    </ul>
  </div>)
})

const Input = memo(function Input() {
  const { setMessage, addItem, message } = useDashboardContext()
  return (<div style={styles.inputGroup}>
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Add a task..."
      style={styles.input}
    />
    <button style={styles.button} onClick={addItem}>Add</button>
  </div>)
})

function Content({ children }) {
  return (<div style={styles.content}>{children}</div >)
}
function App() {
  return (
    <>
      <ToolBar />
      <Sidebar />
      <Content>
        <Input />
        <ItemList />
      </Content>
    </>
  );
}

export default App;
