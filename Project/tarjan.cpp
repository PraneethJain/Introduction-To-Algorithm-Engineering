#include "include/tarjan.hpp"
#include <stack>

int disc_time{0};

Edges make_edges(std::stack<Edge> &stack, const Edge stop_edge)
{
  Edges es{};
  while (!stack.empty() && stack.top() != stop_edge)
  {
    es.emplace(stack.top());
    stack.pop();
  }

  if (!stack.empty())
  {
    es.emplace(stack.top());
    stack.pop();
  }

  return es;
}

void DFS(const Graph &g, int u, std::vector<int> &low, std::vector<int> &disc, std::vector<int> &par,
         std::stack<Edge> &stack, BCC &bcc)
{
  disc[u] = low[u] = ++disc_time;
  int children{0};

  for (int v : g[u])
  {
    if (disc[v] == -1)
    {
      ++children;
      stack.emplace(u, v);
      par[v] = u;
      DFS(g, v, low, disc, par, stack, bcc);
      low[u] = std::min(low[u], low[v]);

      if ((par[u] == -1 && children > 1) || (par[u] != -1 && low[v] >= disc[u]))
      {
        bcc.insert(make_edges(stack, {u, v}));
      }
    }
    else if (par[u] != v)
    {
      low[u] = std::min(low[u], disc[v]);
      if (disc[v] < disc[u])
      {
        stack.emplace(u, v);
      }
    }
  }
}

BCC tarjan(const Graph &g)
{
  disc_time = 0;
  int n{static_cast<int>(g.size())};

  std::vector<int> disc(n, -1), low(n, -1), par(n, -1);
  std::stack<Edge> stack{};

  BCC bcc{};
  for (int i{0}; i < n; ++i)
  {
    if (disc[i] == -1)
    {
      DFS(g, i, low, disc, par, stack, bcc);
      bcc.insert(make_edges(stack, {-1, -1}));
    }
  }

  return bcc;
}
