import { promises as fs } from "fs";
import type { TimeDatas } from "@/types";
import { XLabel } from "@/types";

const getGraphTimes = async (xLabel: XLabel) => {
  const file = await fs.readFile(
    process.cwd() + `/src/data/${xLabel}.txt`,
    "utf8"
  );

  let graphTimes: TimeDatas = {
    n: [],
    m: [],
    schmidtCheckTime: [],
    schmidtFindTime: [],
    tarjanTime: [],
    schmidtTime: [],
    xData: [],
  };

  let count = 0;
  for (const line of file.split("\n")) {
    if (line === ":)") {
      count = 0;
    } else {
      count++;
      const [a, b] = line.split(" ");
      const [x, y] = [parseInt(a), parseInt(b)];
      if (count === 1) {
        graphTimes.n.push(x);
        graphTimes.m.push(y);

        switch (xLabel) {
          case XLabel.Complete:
            graphTimes.xData.push(x);
            break;
          case XLabel.Density:
            graphTimes.xData.push(Math.round((200 * y) / (x * (x - 1))));
            break;
          case XLabel.Bridge:
            break;
        }
      } else if (count === 2) {
        graphTimes.schmidtCheckTime.push(x + Math.random() / 1000);
        graphTimes.schmidtFindTime.push(y + Math.random() / 1000);
      } else if (count === 3) {
        graphTimes.tarjanTime.push(x + Math.random() / 1000);
        graphTimes.schmidtTime.push(y + Math.random() / 1000);
      }
    }
  }

  return graphTimes;
};

export { getGraphTimes };
export type { TimeDatas };
