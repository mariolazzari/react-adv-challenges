import { Counter } from "./Counter";

type Props = {
  count: number;
  setCount: (count: number) => void;
};

export function Dashboard({ count, setCount }: Props) {
  console.log("🔁 Dashboard re-rendered");

  return (
    <div>
      <h2>Dashboard</h2>
      <Counter count={count} setCount={setCount} />
    </div>
  );
}
