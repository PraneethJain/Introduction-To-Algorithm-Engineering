import { getGraphTimes } from "@/lib";
import { TimeDatas } from "@/lib";
import { Switcher } from "@/components/Switcher";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "900"],
  subsets: ["latin"],
});

export default async function Home() {
  const completeTimes: TimeDatas = await getGraphTimes("Complete");
  const densityTimes: TimeDatas = await getGraphTimes("Density");
  const bridgeTimes: TimeDatas = await getGraphTimes("Bridge");

  return (
    <>
      <div
        className={
          poppins.className +
          " grid justify-items-center bg-black text-white text-justify"
        }
      >
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-8xl">
            Introduction to <br /> Algorithm Engineering
          </h1>
          <h2 className="text-6xl pt-8">
            Biconnectivity Algorithms of <br /> Tarjan-Hopcroft and Jen-Schmidt
          </h2>
          <h2 className="text-6xl py-12">Team 7</h2>
          <div className="text-3xl flex flex-col justify-between h-24">
            <h3>Devika Bej</h3>
            <h3>Moida Praneeth Jain</h3>
          </div>
        </div>

        <div className="min-h-screen px-8">
          <h2 className="text-6xl font-medium mb-6">Problem Description</h2>
          <p className="text-xl">
            The algorithms proposed by Jen-Schmidt and Tarjan-Hopcroft are both
            used to check for biconnectivity of an undirected unweighted graph
            and by extension, to get the biconnected components of such a graph.
            Both these algorithms have a theoretical run time of O(N + M). This
            project aims to compare the practical run times for both the
            algorithms, as this depends on a lot of factors such as
            implementation, processor, etc and not just the algorithm itself.
          </p>

          <h2 className="text-6xl font-medium my-12">Implementation Details</h2>
          <h3 className="text-5xl my-6">Jen Schmidt Algorithm</h3>
          <p className="text-xl">
            In the implementation for this algorithm, there are three main
            functions: <br></br> DFS <br></br> Chain Decomposition <br></br>{" "}
            Make Components <br></br>
            <br></br> The graphs are all single connected components with N
            vertices and M edges. <br></br>
            <br></br> DFS: <br></br> A recursive implementation of DFS which
            keeps track of the in times for all the nodes and also the order in
            which vertices are visited. <br></br> This function also builds a
            tree dfds_tree which has the edges for the DFS tree pointing towards
            the root. <br></br> Run time = O(N + M) <br></br>
            <br></br> Chain Decomposition: <br></br> For each vertex in the
            graph in the DFS order, go through each of its edges. <br></br>{" "}
            First check if the edge is in the DFS tree. If not, then check if
            for a non tree edge, is it directed towards the root. If not, then
            it is a back edge. <br></br> Follow this back edge till an edge
            whose endpoint was visited before is reached. This completes a
            chain. Along with this, a record is kept for all the DFS tree edges
            which are visited. <br></br> At the end of making all such chains,
            the unvisited DFS tree edges aka the bridges are also added.{" "}
            <br></br> This chain decomposition gets returned. <br></br> Run time
            = O(M) + O(N) <br></br> [chain decomposition visits edges of the
            graph and the loop for adding bridges visits edges of the DFS tree]{" "}
            <br></br>
            <br></br> Make Components: <br></br> This function works on the
            following ideas- <br></br> Each cyclic chain forms a new component
            (in the paper, having multiple cyclic chain implies
            non-biconnectivity implying multiple biconnected components){" "}
            <br></br> Each acyclic chain essentially attaches to one of the
            cyclic chains or an acyclic chain attached to it and becomes a part
            of that component. (observed from simulating the algorithm by hand){" "}
            <br></br>
            For an acyclic chain, the two points would belong to at most one
            common BCC (again an observation) <br></br> The bridge chains become
            their own BCCs <br></br> Now to the working of the function-{" "}
            <br></br> For each cyclic chain, create a new component and add the
            index of the BCC to each vertex. <br></br>
            For each acyclic chain, push the edges into the BCC index which is
            common to both its endpoints. <br></br> For each bridge chain, make
            it a separate BCC. <br></br> Run time = O(3M) <br></br> [each loop
            required traversing at most all the edges of the graph]
          </p>
          <h3 className="text-5xl my-6">Tarjan Hopcroft Algorithm</h3>
          <p className="text-xl">Insert description here</p>
        </div>

        <Switcher
          timeDatas={densityTimes}
          header="Increasing Density with Constant N + M"
          description="This plot analyses the dependence of the run time for the algorithms on the density of the graph. To generate graphs of this kind, we have kept $N + M = k$ constant where $N$ and $M$ are the number of vertices and edges respectively. Then, iterating $i$ from 2 to 51, which denotes the density, we used the formulae $N = \frac{i - 200 + \sqrt{(200 - i)^2 + 800ki}}{2i}$ and $M = k - N$ to get a pair $N$ and $M$. Using genrang we generated a random graph with the above parameters."
          xLabel="Density (%)"
        />

        <Switcher
          timeDatas={completeTimes}
          header="Complete Graphs with Increasing Vertices"
          description="Theoretically we know that the run times for both the algorithms is $O(N + M)$ where $N$ and $M$ are the number of vertices and edges respectively. For a complete graph, $M = {N\choose2}$ which is approximately $N^2$. Therefore the run time is $O(N + N^2)$ or $O(N^2)$. This run time can be verified using the plots. To generate the graphs for this case, we used genrang to generate a random graph with $N$ increasing from 100 to 10000, with probability of choosing each edge $P$ set to 1. This ensures the graph contains all possible edges, that is a complete graph."
          xLabel="Vertices"
        />

        <Switcher
          timeDatas={bridgeTimes}
          header="Increasing Bridges with Constant N + M"
          description="This plot analyses the dependence of the run time for the algorithms on the number of bridges in the graph. To generate graphs of this kind, we have kept $N + M = k$ constant where $N$ and $M$ are the number of vertices and edges respectively. Then, iterating $b$ from 100000 to 1350000, which denotes the number of bridges in the graph, we calculated $N = \frac{k - b}{2}$ and $M = k - N$. We then divided the $N$ vertices into $b + 1$ simple cycles of roughly the same size and connected them using single edge bridges. It can be easily verified that in such a graph, $M = N + b$."
          xLabel="Bridges (1e4)"
        />
      </div>
      <a href="https://github.com/PraneethJain/Introduction-To-Algorithm-Engineering/tree/main/Project">
        <Image
          className="fixed bottom-4 right-4 z-50 bg-white rounded-full opacity-70 hover:cursor-pointer"
          src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
          alt="Github"
          width="64"
          height="64"
        />
      </a>
    </>
  );
}
