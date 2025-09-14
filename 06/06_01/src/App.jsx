import { memo } from 'react';
import { useDashboardContext } from './DashboardContext';
import { useToolBarContext } from './ToolBarContext';
import { useWeatherContext } from './WeatherContext';
import { styles, navLinks } from "./dashboardConfig"
import { ErrorBoundary } from "react-error-boundary";

// ErrorFallback Component
const ErrorFallback = ({ error }) => {
  return (
    <div
      role="alert"
      style={{
        ...styles.weatherCard,
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: '20px',
        border: '1px solid red',
        backgroundColor: '#fdd'
      }}
    >
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
};

const ToolBar = memo(function ToolBar() {
  const { count, time } = useToolBarContext()
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

const Input = memo(function Input() {
  const { setMessage, addItem, message } = useDashboardContext()
  return (
    <div style={styles.inputGroup}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Add a task..."
        style={styles.input}
      />
      <button style={styles.button} onClick={addItem}>Add</button>
    </div>)
})

const List = memo(function ItemList() {
  const { items, setMessage, addItem, message } = useDashboardContext()
  return (<div >
    <div style={styles.inputGroup}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Add a task..."
        style={styles.input}
      />
      <button style={styles.button} onClick={addItem}>Add</button>
    </div >
    <div style={styles.card}>
      <h3>📝 Todo</h3>
      <ul style={{ paddingLeft: '20px', height: '80px', overflowY: 'auto' }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>{item}</li>
        ))}
      </ul>
    </div>
  </div>)
})

// HOC ErrorBoundary
const withErrorBoundary = (WrappedComponent) => {
  return (props) => (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

const WeatherCard = memo(function WeatherCard() {
  const { loading, weather, error } = useWeatherContext()

  if (loading) return <p style={styles.weatherCard}>Loading weather...</p>;
  if (error) return <p style={styles.weatherCard}>Something went wrong ...</p>

  return (
    <div style={styles.weatherCard}>
      <h4>🌦️ Weather</h4>
      <p>{weather?.name}</p>
      <p>{weather?.description}</p>
      <p>{weather?.temp}</p>
    </div>
  )
})

const WeatherCardWithBoundaries = withErrorBoundary(WeatherCard)

function Content({ children }) {
  return (<div style={styles.content}>{children}</div >)
}
function App() {

  return (
    <>
      <ToolBar />
      <Sidebar />
      <Content>

        <List />
        <WeatherCardWithBoundaries />
      </Content>
    </>
  );
}

export default App;
