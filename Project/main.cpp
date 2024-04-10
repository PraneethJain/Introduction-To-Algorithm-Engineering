#include "include/schmidt.hpp"
#include "include/tarjan.hpp"
#include <fstream>
#include <iostream>

template <typename T1, typename T2> std::ostream &operator<<(std::ostream &os, const std::pair<T1, T2> &pair)
{
  os << "(" << pair.first << ", " << pair.second << ")";
  return os;
}

Graph read_graph(std::string filename)
{
  std::ifstream file{filename};

  int n{}, m{};
  file >> n >> m;
  Graph g(n, std::vector<int>{});
  for (int i{0}; i < m; ++i)
  {
    int u{}, v{};
    file >> u >> v;
    g[u].push_back(v);
    g[v].push_back(u);
  }

  return g;
}

int main(int argc, char *argv[])
{
  if (argc != 2)
  {
    std::cout << "Enter the input file name as argument" << std::endl;
    return 0;
  }

  Graph g{read_graph(argv[1])};
  BCC a{tarjan(g)}, b{schmidt(g)};

  std::cout << "Tarjan output: " << std::endl;
  for (Edges es : a)
  {
    for (Edge e : es)
    {
      std::cout << e << " ";
    }
    std::cout << std::endl;
  }

  std::cout << "Schmidt output: " << std::endl;
  for (Edges es : b)
  {
    for (Edge e : es)
    {
      std::cout << e << " ";
    }
    std::cout << std::endl;
  }

  return 0;
}
