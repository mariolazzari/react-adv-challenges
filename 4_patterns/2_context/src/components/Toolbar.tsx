import { memo } from "react";
import { useDashboardContext } from "./DashboardContext";
import { styles } from "../dashboardConfig";

export const ToolBar = memo(function ToolBar() {
  const { count, time } = useDashboardContext();

  return (
    <div style={styles.toolbar}>
      <strong>📈 Dashboard</strong>
      <div>
        <span style={{ marginRight: "20px" }}>🕒 {time}</span>
        <span>⏳ Countdown: {count}s</span>
      </div>
    </div>
  );
});
