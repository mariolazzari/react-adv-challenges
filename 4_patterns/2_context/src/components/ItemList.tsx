import { memo } from "react";
import { useDashboardContext } from "./DashboardContext";
import { styles } from "../dashboardConfig";

export const ItemList = memo(function ItemList() {
  const { items } = useDashboardContext();

  return (
    <div style={styles.card}>
      <h3>📝 Todo</h3>
      <ul style={{ paddingLeft: "20px", height: "80px", overflowY: "auto" }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: "5px" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});
