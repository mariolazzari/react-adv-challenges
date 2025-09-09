type Props = {
  count: number;
  setCount: (count: number) => void;
};

export function Counter({ count, setCount }: Props) {
  console.log("🔁 Counter re-rendered");

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
