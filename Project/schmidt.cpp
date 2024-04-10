#include "include/schmidt.hpp"

template <typename T1, typename T2> std::ostream &operator<<(std::ostream &os, const std::pair<T1, T2> &pair)
{
  os << "(" << pair.first << ", " << pair.second << ")";
  return os;
}

int DFS(const Graph &g, Graph &dfs_tree, int u, std::vector<int> &in_times, int time)
{
  in_times[u] = time;
  for (int v : g[u])
  {
    if (in_times[v] != -1)
      continue;

    dfs_tree[v].push_back(u);
    time = DFS(g, dfs_tree, v, in_times, ++time);
  }
  return time;
}

Chains chain_decomposition(const Graph &g, const Graph &dfs_tree, int n, std::vector<int> in_times,
                           std::vector<bool> visited_nodes)
{
  Chains chains{};
  for (int i{0}; i < n; ++i)
  {
    for (int v : g[i])
    {
      if ((dfs_tree[i].size() > 0 and dfs_tree[i][0] == v) or (dfs_tree[v].size() > 0 and dfs_tree[v][0] == i))
        continue;

      if (dfs_tree[v].size() == 0 or in_times[i] > in_times[v])
        continue;

      int p{i}, q{v};
      Edges current_chain{};
      if (visited_nodes[p] and visited_nodes[q])
      {
        current_chain.emplace(p, q);
        chains.emplace(current_chain);
        continue;
      }
      while (not(visited_nodes[p] and visited_nodes[q]))
      {
        current_chain.emplace(p, q);
        visited_nodes[p] = true;
        p = q;
        if (dfs_tree[q].empty())
          q = q;
        else
          q = dfs_tree[q][0];
      }
      chains.emplace(current_chain);
    }
  }

  for (int i{0}; i < n; ++i)
  {
    if (not visited_nodes[i] and not dfs_tree[i].empty())
    {
      visited_nodes[i] = true;
      visited_nodes[dfs_tree[i][0]] = true;
      chains.emplace(Edges{{i, dfs_tree[i][0]}});
    }
  }

  return chains;
}

BCC schmidt(const Graph &g)
{
  BCC bcc{};

  int n{static_cast<int>(g.size())};
  Graph dfs_tree(n, std::vector<int>{});
  std::vector<int> inTimes(n, -1);

  int time{0};
  for (int u{0}; u < n; ++u)
  {
    if (inTimes[u] == -1)
    {
      time = DFS(g, dfs_tree, u, inTimes, time);
      ++time;
    }
  }

  int m{0};
  for (int i{0}; i < n; ++i)
    m += g[i].size();
  m /= 2;
  std::vector<bool> visited_nodes(n, false);

  Chains chains{chain_decomposition(g, dfs_tree, n, inTimes, visited_nodes)};

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
