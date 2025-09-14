import { useMemo, useState } from "react";

const list = [
  {
    title: "React.memo",
    description:
      "Prevents re-rendering of a component unless its props change.",
    reference: "api",
  },
  {
    title: "useMemo",
    description:
      "Memoizes expensive calculations to prevent re-computation on every render.",
    reference: "hooks",
  },
  {
    title: "useCallback",
    description:
      "Returns a memoized version of a function that only changes if dependencies change.",
    reference: "hooks",
  },
  {
    title: "Context",
    description: "Shares a global state without passing props manually",
    reference: "api",
  },
];

export function List() {
  const [items] = useState(list);

  const visibleItems = useMemo(
    () => items?.filter(item => item.reference),
    [items]
  );

  return (
    <ul>
      {visibleItems?.map((item, index) => (
        <li key={index}>{item.title}</li>
      ))}
    </ul>
  );
}
