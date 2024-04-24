import { promises as fs } from 'fs';

type TimeData = {
    n: number;
    m: number;
    schmidtCheckTime: number;
    schmidtFindTime: number;
    tarjanTime: number;
    schmidtTime: number;
};

const getGraphTimes = async (factor: number) => {
    const file = await fs.readFile(process.cwd() + `/src/app/data/${factor}.txt`, 'utf8');


    let graphTimes: TimeData[] = [];

    let graphTime: TimeData = { n: 0, m: 0, schmidtCheckTime: 0, schmidtFindTime: 0, tarjanTime: 0, schmidtTime: 0 };
    let count = 0;
    for (const line of file.split("\n")) {
        if (line === ":)") {
            count = 0;
            graphTimes.push(graphTime);
            graphTime = { n: 0, m: 0, schmidtCheckTime: 0, schmidtFindTime: 0, tarjanTime: 0, schmidtTime: 0 };
        } else {
            count++;
            const [a, b] = line.split(" ");
            const [x, y] = [parseInt(a), parseInt(b)];
            if (count === 1) {
                graphTime.n = x;
                graphTime.m = y;
            } else if (count === 2) {
                graphTime.schmidtCheckTime = x;
                graphTime.schmidtFindTime = y;
            } else if (count === 3) {
                graphTime.tarjanTime = x;
                graphTime.schmidtTime = y;
            }
        }
    }

    return graphTimes;
}


export { getGraphTimes }
export type { TimeData }