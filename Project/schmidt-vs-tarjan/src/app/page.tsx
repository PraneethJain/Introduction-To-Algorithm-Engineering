import { getGraphTimes } from "@/lib";
import type { TimeData } from "@/lib";
import { LineChart } from "./graphs/LineChart";

export default async function Home() {
  const graphTimes: TimeData[] = await getGraphTimes(1000000);
  console.log(graphTimes);
  console.log(graphTimes.length);

  return (
    <div className="grid justify-items-center">
      <LineChart graphTimes={graphTimes}></LineChart>
    </div>
  );
}
