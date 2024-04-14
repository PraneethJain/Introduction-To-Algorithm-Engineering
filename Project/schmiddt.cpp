#include "include/schmidt.hpp"
#include <algorithm>
#include <functional>
#include <map>
#include <set>

template <typename T1, typename T2> std::ostream &operator<<(std::ostream &os, const std::pair<T1, T2> &pair)
{
  os << "(" << pair.first << ", " << pair.second << ")";
  return os;
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

  Chains cycle_chains{};
  Chains path_chains{};
  std::map<int, Edges> back_edges{};
  std::vector<int> in_time(n, -1), parent(n, -1);
  int time{0};

  const std::function<void(int, int)> dfs = [&](int u, int par) -> void {
    in_time[u] = time;
    ++time;
    parent[u] = par;
    for (const int v : g[u])
    {
      if (v == par)
        continue;

      if (in_time[v] == -1)
      {
        dfs(v, u);
      }
      else
      {
        Edge back_edge{v, u};
        int key{in_time[v]};
        if (back_edges.count(key))
        {
          if (std::find(back_edges[key].begin(), back_edges[key].end(), back_edge) == back_edges[key].end())
          {
            back_edges[key].push_back(back_edge);
          }
        }
        else
        {
          bool add_edge{true};
          if (back_edges.count(in_time[u]))
          {
            add_edge = std::find(back_edges[in_time[u]].begin(), back_edges[in_time[u]].end(), back_edge) ==
                       back_edges[in_time[u]].end();
          }

          if (add_edge)
          {
            back_edges[key] = {{back_edge}};
          }
        }
      }
    }
  };

  dfs(0, -1);

  std::vector<bool> vis(n, false);
  std::set<Edge> done{};
  for (auto const &[key, es] : back_edges)
  {
    for (Edge e : es)
    {
      Edges chain{};
      vis[e.first] = true;
      chain.push_back(e);
      int cur{e.second};

      while (cur != e.first && !vis[cur])
      {
        vis[cur] = true;
        int next{parent[cur]};
        chain.push_back({cur, next});
        cur = next;
      }

      if (cur == e.first)
      {
        cycle_chains.push_back(chain);
        done.insert(chain.begin(), chain.end());
      }
      else
      {
        if (chain.size() == 1)
        {
          if (done.find(chain[0]) == done.end() && done.find({chain[0].second, chain[0].first}) == done.end())
          {
            path_chains.push_back(chain);
            done.insert(chain[0]);
          }
        }
        else
        {

          path_chains.push_back(chain);
          done.insert(chain.begin(), chain.end());
        }
      }
    }
  }

  Chains all_chains{};
  all_chains.insert(all_chains.end(), cycle_chains.begin(), cycle_chains.end());
  all_chains.insert(all_chains.end(), path_chains.begin(), path_chains.end());

  std::cout << all_chains.size() << std::endl;
  for (Edges es : all_chains)
  {
    for (Edge e : es)
    {
      std::cout << e << " ";
    }
    std::cout << std::endl;
  }

  BCC bcc{make_components(all_chains, n)};

  return bcc;
}
