import { getGraphTimes } from "@/lib";
import { XLabel } from "@/types";
import { TimeDatas } from "@/lib";
import { LineChart } from "@/components/LineChart";
import { StreamGraph } from "@/components/StreamChart";

const toStreamData = (timeDatas: TimeDatas) => {
  const size = timeDatas.xData.length - 1;
  let data = [];
  for (let i = 0; i < size; ++i) {
    data.push({
      x: timeDatas.xData[i],
      tarjanTime: timeDatas.tarjanTime[i],
      schmidtTime: timeDatas.schmidtTime[i],
      schmidtFindTime: timeDatas.schmidtFindTime[i],
      schmidtCheckTime: timeDatas.schmidtCheckTime[i],
    });
  }

  return data;
};

export default async function Home() {
  const completeTimes: TimeDatas = await getGraphTimes(XLabel.Complete);
  const densityTimes: TimeDatas = await getGraphTimes(XLabel.Density);
  const bridgeTimes: TimeDatas = await getGraphTimes(XLabel.Bridge);

  return (
    <div className="grid justify-items-center bg-black text-white">
      <StreamGraph
        data={toStreamData(completeTimes)}
        width={600}
        height={400}
      />
      <StreamGraph data={toStreamData(bridgeTimes)} width={600} height={400} />
      <StreamGraph data={toStreamData(densityTimes)} width={600} height={400} />
    </div>
  );
}
