import { getGraphTimes } from "@/lib";
import { TimeDatas } from "@/lib";
import { Switcher } from "@/components/Switcher";

export default async function Home() {
  const completeTimes: TimeDatas = await getGraphTimes("Complete");
  const densityTimes: TimeDatas = await getGraphTimes("Density");
  const bridgeTimes: TimeDatas = await getGraphTimes("Bridge");

  return (
    <div className="grid justify-items-center bg-black text-white">
      <Switcher
        timeDatas={densityTimes}
        header="Increasing Density with Constant n + m"
        description="density description"
        xLabel="Density (%)"
      />

      <Switcher
        timeDatas={completeTimes}
        header="Complete Graphs with Increasing Vertices"
        description="complete description"
        xLabel="Vertices"
      />

      <Switcher
        timeDatas={bridgeTimes}
        header="Increasing bridges with constant n + m"
        description="bridges description"
        xLabel="Bridges (1e4)"
      />
    </div>
  );
}
