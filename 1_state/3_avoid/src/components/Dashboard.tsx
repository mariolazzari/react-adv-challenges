import type { PropsWithChildren } from "react";

export function Dashboard({ children }: PropsWithChildren) {
  console.log("🔁 Dashboard re-rendered");
  return <div>{children}</div>;
}
