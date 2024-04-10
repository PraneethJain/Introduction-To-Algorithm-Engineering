#ifndef __TYPES_HPP
#define __TYPES_HPP

#include <algorithm>
#include <iostream>
#include <set>
#include <utility>
#include <vector>

using AdjList = std::vector<int>;
using Graph = std::vector<AdjList>;

using Edge = std::pair<int, int>;
using Edges = std::set<Edge>;
using Chains = std::set<Edges>;
using BCC = std::set<Edges>;

#endif
