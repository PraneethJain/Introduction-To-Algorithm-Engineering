#set text(font: "Roboto")
#show link: set text(rgb(0, 0, 255))
#import "@preview/diagraph:0.2.1": *

#set page(
  header: [Moida Praneeth Jain #h(1fr) 2022101093 #line(start: (-10%, 0%), end: (110%, 0%))], footer: [#line(start: (-10%, 0%), end: (110%, 0%))
    Introduction to Algorithm Engineering
    #h(1fr)
    #counter(page).display("1 of 1", both: true)
    #h(1fr)
    Assignment 3 ], margin: (x: 1.5cm),
)

= Problem 1
Assuming the graph is connected

== (i)
Let the graph be $G = (V, E)$ such that $|V| = n$ and $|E| = m$

=== Lower Bound
The lower bound for the number of articulation points is trivially 0, by
considering the graph where every vertex is part of the same cycle and has
degree 2.

#align(center)[
#raw-render(```dot
    graph {
      layout=circo;

      1 -- 2
      1 -- n
      2 -- 3
      3 -- 4
      4 -- n [style=dotted]
    }
    ```)
]

In the above graph, there are no articulation points, as every vertex has two
vertex disjoint paths to every other vertex, thus removing any vertex would not
cause the graph to become disconnected.

Thus, the lower bound is 0.

=== Upper Bound

To find an upper bound on the number of articulation points, we first prove the
following claims

*Claim 1*: Adding edges to a graph can never increase the number of articulation
points

*Proof*: The number of articulation points can either stay the same if the edge
was added between nodes in the same biconnected component, or it can decrease by
one if the edge was added between two different biconnected components

*Claim 2*: In a connected graph with every node being part of a cycle, all
articulation points must have degree greater than or equal to 3.

*Proof*: Since every graph is part of a cycle, every node has degree greater
than or equal to 2. A node of degree 2 can never be an articulation point, as
both the edges of that node are part of the cycle it belongs to. Due to this
node, the cycle ensures connectivity does not change.

*Claim 3*: A graph containing cycles of exactly size three will have the maximum
number of articulation points.

*Proof*: Since articulation points result in forming biconnected components, and
biconnected components are cyclic, the larger the number of biconnected
components we have, the larger the number of articulation points. In order to
increase the number of biconnected components for a fixed number of nodes, we
increase the number of cycles, thus minimizing the size of each cycle.

Now, we will be constructing a graph using these cycles of size three. The
construction will result in a graph with all nodes of degree 3 being
articulation points, and thus no node would be of degree greater than or equal
to 4.

Note that we will be joining the cycles with bridges wherever possible because
each bridge produces two articulation points.

*Case 1*: $n % 3 == 0$
#raw-render(```dot
    graph {
      layout=circo;

      1 -- 2
      2 -- 3
      3 -- 1

      4 -- 3

      4 -- 5
      5 -- 6
      6 -- 4

      6 -- "n-2" [style=dotted]

      "n-2" -- "n-1"
      "n-1"-- "n"
      "n" -- "n-2"
    }
    ```, width: 80%)
The articulation points are the nodes numbered $3i$ and $3i+1$, with a total of $(2n)/3-2$ articulation
points

*Case 2*: $n%3==1$
#raw-render(```dot
    graph {
      layout=circo;

      1 -- 2

      2 -- 3
      3 -- 4
      4 -- 2

      5 -- 4

      5 -- 6
      6 -- 7
      7 -- 5

      7 -- "n-2" [style=dotted]

      "n-2" -- "n-1"
      "n-1"-- "n"
      "n" -- "n-2"
    }
    ```, width: 100%)

$(2(n+2))/3 - 3$ articulation points

*Case 3*: $n%3==2$

#raw-render(```dot
    graph {
      layout=circo;

      1 -- 2
      1 -- 3
      2 -- 3

      3 -- 4
      4 -- 5
      5 -- 3

      6 -- 5

      6 -- 7
      7 -- 8
      8 -- 6

      8 -- "n-2" [style=dotted]

      "n-2" -- "n-1"
      "n-1"-- "n"
      "n" -- "n-2"
    }
    ```, width: 100%)
$(2(n+1))/3 - 3$ articulation points, assuming $n > 2$

Thus, the maximum number of articulation points are of the order of $(2n)/3$,
with exact values depicted above.

== (ii)

The APSP algorithm requires a matrix of size $a times a$, where $a$ is the
number of articulation points. From the above question, the required memory is $(2n)/3 * (2n)/3$ integers,
i.e, $O((4n^2)/9)$.

= Problem 2
*To Prove*: All $(u, v) in.not E(H)$ with $u$ and $v$ in different clusters must
have been removed from $E^'$ in Phase 2 of the spanner algorithm

*Proof*:

Let $(u, v) in.not E(H)$ be an arbitrary edge between different clusters. Since
the edge was discarded, it was either discarded in phase 1 or phase 2.

Assume the edge was discarded in phase 1. The only edges discarded in phase 1
are those belonding to the same cluster. This means the edge $(u, v)$ is in the
same cluster. This is a contradiction. Thus, the edge must have been discared in
phase 2.

Hence, proven.

= Problem 3

