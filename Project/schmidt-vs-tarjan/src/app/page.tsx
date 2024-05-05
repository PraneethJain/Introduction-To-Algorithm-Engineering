import { getGraphTimes } from "@/lib";
import { XLabel } from "@/types";
import { TimeDatas } from "@/lib";
import { LineChart } from "@/components/LineChart";

export default async function Home() {
  const completeTimes: TimeDatas = await getGraphTimes(XLabel.Complete);
  const densityTimes: TimeDatas = await getGraphTimes(XLabel.Density);
  const bridgeTimes: TimeDatas = await getGraphTimes(XLabel.Bridge);

  return (
    <div className="grid justify-items-center bg-black text-white">
      <LineChart graphTimes={densityTimes} xLabel={XLabel.Density}></LineChart>
      <LineChart
        graphTimes={completeTimes}
        xLabel={XLabel.Complete}
      ></LineChart>
      <LineChart graphTimes={bridgeTimes} xLabel={XLabel.Bridge}></LineChart>
    </div>
  );
}
