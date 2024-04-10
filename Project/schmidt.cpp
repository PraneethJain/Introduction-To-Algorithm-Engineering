#include "include/schmidt.hpp"

template <typename T1, typename T2> std::ostream &operator<<(std::ostream &os, const std::pair<T1, T2> &pair)
{
  os << "(" << pair.first << ", " << pair.second << ")";
  return os;
}

int DFS(const Graph &g, Graph &dfsTree, int u, std::vector<int> &inTimes, int time)
{
  inTimes[u] = time;
  for (int v : g[u])
  {
    if (inTimes[v] != -1)
      continue;

    dfsTree[v].push_back(u);
    time = DFS(g, dfsTree, v, inTimes, ++time);
  }
  return time;
}

void ChainDecomposition(const Graph &g, const Graph &dfsTree, Chains &chains, int n, std::vector<int> inTimes,
                        std::vector<bool> visitedNodes)
{
  for (int i{0}; i < n; ++i)
  {
    for (int v : g[i])
    {
      if ((dfsTree[i].size() > 0 and dfsTree[i][0] == v) or (dfsTree[v].size() > 0 and dfsTree[v][0] == i))
        continue;

      if (dfsTree[v].size() == 0 or inTimes[i] > inTimes[v])
        continue;

      int p{i}, q{v};
      Edges currentChain{};
      if (visitedNodes[p] and visitedNodes[q])
      {
        currentChain.insert(std::make_pair(p, q));
        chains.insert(currentChain);
        continue;
      }
      while (not(visitedNodes[p] and visitedNodes[q]))
      {
        currentChain.insert(std::make_pair(p, q));
        visitedNodes[p] = true;
        p = q;
        if (dfsTree[q].empty())
          q = q;
        else
          q = dfsTree[q][0];
      }
      chains.insert(currentChain);
    }
  }

  for (int i{0}; i < n; ++i)
  {
    if (not visitedNodes[i] and not dfsTree[i].empty())
    {
      Edges bridge{};
      bridge.insert(std::make_pair(i, dfsTree[i][0]));
      visitedNodes[i] = true;
      visitedNodes[dfsTree[i][0]] = true;
      chains.insert(bridge);
    }
  }
}

BCC schmidt(const Graph &g)
{
  BCC bcc{};
  bcc.emplace(Edges{{g[0][0], g[0][1]}, {g[1][0], g[1][1]}});

  int n{static_cast<int>(g.size())};
  Graph dfsTree(n, std::vector<int>{});
  std::vector<int> inTimes(n, -1);

  int time = 0;
  for (int u{0}; u < n; ++u)
  {
    if (inTimes[u] == -1)
    {
      time = DFS(g, dfsTree, u, inTimes, time);
      ++time;
    }
  }

  int m{0};
  for (int i{0}; i < n; ++i)
    m += g[i].size();
  m /= 2;
  Chains chains{};
  std::vector<bool> visitedNodes(n, false);

  ChainDecomposition(g, dfsTree, chains, n, inTimes, visitedNodes);

  for (Edges chain : chains)
  {
    for (Edge edge : chain)
    {
      std::cout << edge << " ";
    }
    std::cout << std::endl;
  }

  return bcc;
}
