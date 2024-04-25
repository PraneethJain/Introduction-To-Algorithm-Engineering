import { promises as fs } from "fs";

type TimeDatas = {
  n: number[];
  m: number[];
  schmidtCheckTime: number[];
  schmidtFindTime: number[];
  tarjanTime: number[];
  schmidtTime: number[];
  density: number[];
};

const getGraphTimes = async (factor: number) => {
  const file = await fs.readFile(
    process.cwd() + `/src/app/data/${factor}.txt`,
    "utf8"
  );

  let graphTimes: TimeDatas = {
    n: [],
    m: [],
    schmidtCheckTime: [],
    schmidtFindTime: [],
    tarjanTime: [],
    schmidtTime: [],
    density: [],
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
        graphTimes.density.push((200 * y) / (x * (x - 1)));
      } else if (count === 2) {
        graphTimes.schmidtCheckTime.push(x);
        graphTimes.schmidtFindTime.push(y);
      } else if (count === 3) {
        graphTimes.tarjanTime.push(x);
        graphTimes.schmidtTime.push(y);
      }
    }
  }

  return graphTimes;
};

export { getGraphTimes };
export type { TimeDatas };
