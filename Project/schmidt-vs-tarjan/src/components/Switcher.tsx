"use client";

import { LineChart } from "@/components/LineChart";
import { StreamChart } from "@/components/StreamChart";
import type { TimeDatas } from "@/types";
import { useState } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "900"],
  subsets: ["latin"],
});

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
    <div
      className={
        "w-3/4 pt-24 flex flex-col items-center min-h-screen " +
        roboto.className
      }
    >
      <h1 className="text-3xl font-bold">{header}</h1>
      <div className="my-4">
        <Latex>{description}</Latex>
      </div>
      <label className="toggle-switch z-10">
        <input type="checkbox" onClick={() => setToggle(!curToggle)}></input>
        <div className="toggle-switch-background">
          <div className="toggle-switch-handle"></div>
        </div>
      </label>

      {curToggle ? (
        <LineChart
          graphTimes={timeDatas}
          labelColors={labelColors}
          xLabel={xLabel}
        />
      ) : (
        <StreamChart
          data={toStreamData(timeDatas)}
          labelColors={labelColors}
          xLabel={xLabel}
        />
      )}
    </div>
  );
};

export { Switcher };
