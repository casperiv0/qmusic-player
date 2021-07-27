import * as React from "react";
import { MusicManager } from "../lib/MusicManager";

const Page = () => {
  const manager = React.useMemo(() => typeof window !== "undefined" && new MusicManager(), []);
  console.log(manager);

  return <div>Hello World</div>;
};

export default Page;
