import { memo } from "react";

type Props = {
  count: number;
};

export const Component = memo(function Componebt({ count }: Props) {
  console.log("Rendered Expensive Component");

  return <p>{count}</p>;
});
