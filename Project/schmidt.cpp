#include "include/schmidt.hpp"
#include <queue>

int DFS(const Graph &g, Graph &dfs_tree, int u, std::vector<int> &in_times, int time, std::queue<int> &q)
{
  in_times[u] = time;
  q.push(u);
  for (int v : g[u])
  {
    if (in_times[v] != -1)
      continue;

    dfs_tree[v].push_back(u);
    time = DFS(g, dfs_tree, v, in_times, ++time, q);
  }
  return time;
}

Chains chain_decomposition(const Graph &g, const Graph &dfs_tree, int n, std::vector<int> in_times, std::queue<int> q)
{
  Chains chains{};
  std::vector<bool> visited_nodes(n, false);
  std::vector<bool> visited_dfs_edges(n, false);

  for (int i{0}; i < n; ++i)
  {
    if (dfs_tree[i].empty())
      visited_dfs_edges[i] = true;
  }

  while (!q.empty())
  {
    int i{q.front()};
    q.pop();
    for (int v : g[i])
    {
      if ((dfs_tree[i].size() > 0 and dfs_tree[i][0] == v) or (dfs_tree[v].size() > 0 and dfs_tree[v][0] == i))
        continue;

      if (dfs_tree[v].size() == 0 or in_times[i] > in_times[v])
        continue;

      int init{i};
      int p{i}, q{v};
      Edges current_chain{};

      if (visited_nodes[p] and visited_nodes[q])
      {
        current_chain.emplace_back(p, q);
        chains.emplace_back(current_chain);
        continue;
      }

      do
      {
        current_chain.emplace_back(p, q);
        if (not dfs_tree[p].empty() and dfs_tree[p][0] == q)
        {
          visited_dfs_edges[p] = true;
        }
        visited_nodes[p] = true;
        p = q;
        if (dfs_tree[q].empty())
          q = q;
        else
          q = dfs_tree[q][0];
      } while (not(visited_nodes[p] and visited_nodes[q]) and p != init);

      chains.emplace_back(current_chain);
    }
  }

  for (int i{0}; i < n; ++i)
  {
    if ((not visited_nodes[i] and not dfs_tree[i].empty()) or (not visited_dfs_edges[i]))
    {
      visited_nodes[i] = true;
      visited_dfs_edges[i] = true;
      visited_nodes[dfs_tree[i][0]] = true;
      chains.emplace_back(Edges{{i, dfs_tree[i][0]}});
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
    if (chain[0].first == chain[chain.size() - 1].second)
    {
      bcc.emplace_back(chain.begin(), chain.end());
      for (Edge edge : chain)
      {
        component_indices[edge.first].emplace_back(component_count);
      }
      ++component_count;
      continue;
    }

    int v1{chain[0].first}, v2{chain[chain.size() - 1].second};
    int component_index{-1};
    for (int i : component_indices[v1])
    {
      for (int j : component_indices[v2])
      {
        if (i == j)
        {
          component_index = i;
          break;
        }
      }
      if (component_index != -1)
        break;
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
    for (int i{0}; i < (int)chain.size() - 1; ++i)
    {
      component_indices[chain[i].second].emplace_back(component_index);
    }
  }

  return bcc;
}

BCC schmidt(const Graph &g)
{
  int n{static_cast<int>(g.size())};
  Graph dfs_tree(n, std::vector<int>{});
  std::vector<int> in_times(n, -1);
  std::queue<int> q{};

  int time{0};
  for (int u{0}; u < n; ++u)
  {
    if (in_times[u] == -1)
    {
      time = DFS(g, dfs_tree, u, in_times, time, q);
      ++time;
    }
  }

  Chains chains{chain_decomposition(g, dfs_tree, n, in_times, q)};
  BCC bcc{make_components(chains, n)};

  return bcc;
}
