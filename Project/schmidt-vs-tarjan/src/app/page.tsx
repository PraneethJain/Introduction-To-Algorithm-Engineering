import { getGraphTimes } from "@/lib";
import type { TimeData } from "@/lib";

export default async function Home() {
  const graphTimes: TimeData[] = await getGraphTimes(100);
  console.log(graphTimes);

  return <h1>Test</h1>;
}
