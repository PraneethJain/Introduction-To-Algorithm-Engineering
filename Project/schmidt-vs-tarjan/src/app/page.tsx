import { getGraphTimes } from "@/lib";
import { TimeDatas } from "@/lib";
import { Switcher } from "@/components/Switcher";
import { Roboto } from "next/font/google";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "500", "900"],
  subsets: ["latin"],
});

export default async function Home() {
  const completeTimes: TimeDatas = await getGraphTimes("Complete");
  const densityTimes: TimeDatas = await getGraphTimes("Density");
  const bridgeTimes: TimeDatas = await getGraphTimes("Bridge");

  return (
    <div
      className={
        poppins.className +
        " grid justify-items-center bg-black text-white text-justify"
      }
    >
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl text-center">
          Introduction to <br /> Algorithm Engineering
        </h1>
        <h2 className="text-6xl py-12">Team 7</h2>
        <div className="text-3xl flex flex-col justify-between text-center h-24">
          <h3>Devika Bej</h3>
          <h3>Moida Praneeth Jain</h3>
        </div>
      </div>
      <Switcher
        timeDatas={densityTimes}
        header="Increasing Density with Constant N + M"
        description="This plot analyses the dependence of the run time for the algorithms on the density of the graph. To generate graphs of this kind, we have kept N + M = k constant where N and M are the number of vertices and edges respectively. Then, iterating i from 2 to 51, which denotes the density, we used the formulae N = (i - 200 + sqrt((200 - i)^2 + 800ki)) / 2i and M = k - N to get a pair N and M. Using genrang we generated a random graph with the above parameters."
        xLabel="Density (%)"
      />

      <Switcher
        timeDatas={completeTimes}
        header="Complete Graphs with Increasing Vertices"
        description="Theoretically we know that the run times for both the algorithms is O(N + M) where N and M are the number of vertices and edges respectively. For a complete graph, M = Nc2 which is approximately N^2. Therefore the run time is O(N + N^2) or O(N^2). This run time can be verified using the plots. To generate the graphs for this case, we used genrang to generate a random graph with N increasing from 100 to 10000, with probability of choosing each edge P set to 1. This ensures the graph contains all possible edges, that is a complete graph."
        xLabel="Vertices"
      />

      <Switcher
        timeDatas={bridgeTimes}
        header="Increasing Bridges with Constant N + M"
        description="This plot analyses the dependence of the run time for the algorithms on the number of bridges in the graph. To generate graphs of this kind, we have kept N + M = k constant where N and M are the number of vertices and edges respectively. Then, iterating b from 100000 to 1350000, which denotes the number of bridges in the graph, we calculated N = (k - b) / 2 and M = k - N. We then divided the N vertices into b + 1 simple cycles of roughly the same size and connected them using single edge bridges. It can be easily verified that in such a graph, M = N + b."
        xLabel="Bridges (1e4)"
      />
    </div>
  );
}
