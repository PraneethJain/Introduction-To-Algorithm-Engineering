#ifndef __TYPES_HPP
#define __TYPES_HPP

#include <algorithm>
#include <iostream>
#include <utility>
#include <vector>

using AdjList = std::vector<int>;
using Graph = std::vector<AdjList>;

using Edge = std::pair<int, int>;
using Edges = std::vector<Edge>;
using Chains = std::vector<Edges>;
using BCC = std::vector<Edges>;

#endif
