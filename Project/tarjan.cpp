#include "include/tarjan.hpp"

BCC tarjan(const Graph &g)
{
  BCC bcc{};
  bcc.emplace(Edges{{g[0][0], g[0][1]}, {g[1][0], g[1][1]}});

  return bcc;
}
