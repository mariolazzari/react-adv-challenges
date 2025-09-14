import { useContext } from "react";
import { DashboardContext } from "./components/DashboardContext";
import { styles } from "./dashboardConfig";
import { ToolBar } from "./components/Toolbar";
import { Sidebar } from "./components/Sidebat";
import { ItemList } from "./components/ItemList";

function App() {
  const { setMessage, addItem, message } = useContext(DashboardContext);

  return (
    <>
      <ToolBar />
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.inputGroup}>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Add a task..."
            style={styles.input}
          />
          <button style={styles.button} onClick={addItem}>
            Add
          </button>
        </div>
        <ItemList />
      </div>
    </>
  );
}

export default App;
