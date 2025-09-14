import { memo } from "react";
import { navLinks, styles } from "../dashboardConfig";

export const Sidebar = memo(function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <nav>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                style={{ color: "#ccc", textDecoration: "none" }}
              >
                {link.icon} {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});
