"use client";

import { LineChart } from "@/components/LineChart";
import { StreamChart } from "@/components/StreamChart";
import type { TimeDatas } from "@/types";
import { useState } from "react";

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

type SwitcherProps = {
  timeDatas: TimeDatas;
  xLabel: string;
  header: string;
  description: string;
};

const Switcher = ({
  timeDatas,
  xLabel,
  header,
  description,
}: SwitcherProps) => {
  const [curToggle, setToggle] = useState(true);

  const labelColors = {
    TarjanTime: "#FAA752",
    "Schmidt Time": "#32C7FC",
    "Schmidt Find Time": "#A9FB54",
    "Schmidt Check Time": "#E53BFF",
  };

  return (
    <div className="w-3/4 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">{header}</h1>
      <p className="my-4">{description}</p>
      <button className="" onClick={() => setToggle(!curToggle)}>
        Toggle
      </button>
      {curToggle ? (
        <LineChart
          graphTimes={timeDatas}
          labelColors={labelColors}
          xLabel={xLabel}
        />
      ) : (
        <StreamChart
          width={600}
          height={400}
          data={toStreamData(timeDatas)}
          labelColors={labelColors}
          xLabel={xLabel}
        />
      )}
    </div>
  );
};

export { Switcher };
