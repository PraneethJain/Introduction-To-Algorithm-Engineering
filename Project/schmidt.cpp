#include "include/schmidt.hpp"
#include <chrono>

int DFS(const Graph &g, Graph &dfs_tree, int u, std::vector<int> &in_times, int time, std::vector<int> &node_order)
{
  in_times[u] = time;
  node_order[time] = u;

  for (int v : g[u])
  {
    if (in_times[v] != -1)
      continue;

    dfs_tree[v].push_back(u);
    time = DFS(g, dfs_tree, v, in_times, ++time, node_order);
  }
  return time;
}

Chains chain_decomposition(const Graph &g, const Graph &dfs_tree, int n, std::vector<int> in_times,
                           std::vector<int> node_order)
{
  Chains chains{};
  std::vector<bool> visited_nodes(n, false);
  std::vector<bool> visited_dfs_edges(n, false);

  for (int i{0}; i < n; ++i)
  {
    if (dfs_tree[i].empty())
    {
      visited_dfs_edges[i] = true;
    }
  }

  for (int i{0}; i < n; ++i)
  {
    int u{node_order[i]};
    for (int v : g[u])
    {
      if ((not dfs_tree[u].empty() and dfs_tree[u][0] == v) or (not dfs_tree[v].empty() and dfs_tree[v][0] == u))
      {
        // dfs tree edge
        continue;
      }

      if (in_times[v] < in_times[u])
      {
        // v is ancestor of u, therefore not a valid back edge
        continue;
      }

      Edges current_chain{};
      int p{u}, q{v};
      while (true)
      {
        current_chain.emplace_back(p, q);
        visited_nodes[p] = true;
        if (not dfs_tree[p].empty() and dfs_tree[p][0] == q)
        {
          visited_dfs_edges[p] = true;
        }
        if (visited_nodes[q])
          break;
        p = q;
        q = dfs_tree[q][0];
      }
      chains.emplace_back(current_chain);
    }
  }

  for (int i{0}; i < n; ++i)
  {
    if (not visited_dfs_edges[i])
    {
      Edges bridge{};
      bridge.emplace_back(i, dfs_tree[i][0]);
      visited_nodes[i] = visited_nodes[dfs_tree[i][0]] = true;
      visited_dfs_edges[i] = true;
      chains.emplace_back(bridge.begin(), bridge.end());
    }
  }

  return chains;
}

BCC make_components(const Chains &chains, int n)
{
  std::vector<std::vector<int>> component_indices(n);
  BCC bcc{};
  int component_count{0};

  for (Edges chain : chains)
  {
    int v1{chain[0].first}, v2{chain[chain.size() - 1].second};
    if (v1 == v2)
    {
      bcc.emplace_back(chain.begin(), chain.end());
      for (Edge edge : chain)
      {
        component_indices[edge.first].emplace_back(component_count);
      }
      ++component_count;
    }
  }

  for (Edges chain : chains)
  {
    int v1{chain[0].first}, v2{chain[chain.size() - 1].second};
    if (v1 != v2)
    {
      int component_index{-1};
      for (int i : component_indices[v1])
      {
        for (int j : component_indices[v2])
        {
          if (i == j)
            component_index = i;
        }
      }

      if (component_index == -1)
      {
        bcc.emplace_back(chain.begin(), chain.end());
        component_indices[chain[0].first].emplace_back(component_count);
        component_indices[chain[0].second].emplace_back(component_count);
        ++component_count;
        continue;
      }

      bcc[component_index].insert(bcc[component_index].end(), chain.begin(), chain.end());
      for (int i = 1; i < int(chain.size()); ++i)
      {
        component_indices[chain[i].first].emplace_back(component_index);
      }
    }
  }

  return bcc;
}

BCC schmidt(const Graph &g)
{

  auto x1{std::chrono::high_resolution_clock::now()};

  int n{static_cast<int>(g.size())};
  Graph dfs_tree(n, std::vector<int>{});
  std::vector<int> in_times(n, -1);
  std::vector<int> node_order(n, -1);

  int time{0};
  for (int u{0}; u < n; ++u)
  {
    if (in_times[u] == -1)
    {
      time = DFS(g, dfs_tree, u, in_times, time, node_order);
      ++time;
    }
  }

  Chains chains{chain_decomposition(g, dfs_tree, n, in_times, node_order)};
  auto x2{std::chrono::high_resolution_clock::now()};
  BCC bcc{make_components(chains, n)};
  auto x3{std::chrono::high_resolution_clock::now()};

  auto t1{std::chrono::duration_cast<std::chrono::milliseconds>(x2 - x1).count()};
  auto t2{std::chrono::duration_cast<std::chrono::milliseconds>(x3 - x2).count()};

  std::cout << "Schmidt Check Time " << t1 << "ms" << std::endl;

  std::cout << "Schmidt Find Time " << t2 << "ms" << std::endl;

  return bcc;
}
