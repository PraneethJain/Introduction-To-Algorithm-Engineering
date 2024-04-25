import { getGraphTimes } from "@/lib";
import type { TimeDatas } from "@/lib";
import { LineChart } from "./graphs/LineChart";

export default async function Home() {
  const graphTimes: TimeDatas = await getGraphTimes(1000000);

  return (
    <div className="grid justify-items-center">
      <LineChart graphTimes={graphTimes}></LineChart>
    </div>
  );
}
