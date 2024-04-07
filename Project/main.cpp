#include "include/schmidt.hpp"
#include "include/tarjan.hpp"
#include <iostream>

template <typename T1, typename T2> std::ostream &operator<<(std::ostream &os, const std::pair<T1, T2> &pair)
{
  os << "(" << pair.first << ", " << pair.second << ")";
  return os;
}

int main()
{
  std::cout << "test" << std::endl;
  Graph g{{1, 2}, {0, 2}, {0, 1}};
  BCC a{tarjan(g)}, b{schmidt(g)};
  for (Edges es : a)
  {
    for (Edge e : es)
    {
      std::cout << e << std::endl;
    }
  }

  return 0;
}
