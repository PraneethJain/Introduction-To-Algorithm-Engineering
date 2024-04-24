#include "include/schmidt.hpp"
#include "include/tarjan.hpp"
#include <algorithm>
#include <chrono>
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

bool compare(Chains a, Chains b)
{
  const auto order = [](Chains &c) {
    for (Edges &es : c)
    {
      for (Edge &e : es)
      {
        if (e.first > e.second)
        {
          std::swap(e.first, e.second);
        }
      }
      std::sort(es.begin(), es.end());
    }
    std::sort(c.begin(), c.end());
  };

  order(a);
  order(b);

  if (a.size() != b.size())
    return false;

  int n{static_cast<int>(a.size())};
  for (int i{0}; i < n; ++i)
  {
    if (a[i].size() != b[i].size())
      return false;

    int m{static_cast<int>(a[i].size())};
    for (int j{0}; j < m; ++j)
    {
      if (a[i][j] != b[i][j])
        return false;
    }
  }

  return true;
}

int main(int argc, char *argv[])
{
  if (argc != 2)
  {
    std::cout << "Enter the input file name as argument" << std::endl;
    return 0;
  }

  Graph g{read_graph(argv[1])};
  auto x1{std::chrono::high_resolution_clock::now()};
  BCC a{tarjan(g)};
  auto x2{std::chrono::high_resolution_clock::now()};
  BCC b{schmidt(g)};
  auto x3{std::chrono::high_resolution_clock::now()};

  auto tarjan_time = std::chrono::duration_cast<std::chrono::milliseconds>(x2 - x1).count();
  auto schmidt_time = std::chrono::duration_cast<std::chrono::milliseconds>(x3 - x2).count();

  std::cout << tarjan_time << " " << schmidt_time << std::endl;

  bool are_same{compare(a, b)};
  if (are_same)
    std::cout << ":)" << std::endl;
  else
    std::cout << ":(" << std::endl;

  return 0;
}
