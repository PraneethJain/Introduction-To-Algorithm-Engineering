import { getGraphTimes } from "@/lib";
import type { TimeData } from "@/lib";
import { LineChart } from "./graphs/LineChart";

export default async function Home() {
  const graphTimes: TimeData[] = await getGraphTimes(100);
  console.log(graphTimes);

  return (
    <div className="grid justify-items-center">
      <LineChart graphTimes={graphTimes}></LineChart>
    </div>
  );
}
