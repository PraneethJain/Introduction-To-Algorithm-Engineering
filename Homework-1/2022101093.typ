#align(center, text(17pt)[*Introduction to Algorithm Engineering*])
#align(center, text(16pt)[Homework-1])
#align(center, text(13pt)[Moida Praneeth Jain, 2022101093])
#import "@preview/diagraph:0.2.1": *

= Question 1

#align(center)[
  #raw-render(
    ```dot
    graph {
      1 -- 2
      1 -- 3
      1 -- 4

      2 -- 5
      2 -- 6
      2 -- 7
      3 -- 8
      3 -- 9
      3 -- 10
      4 -- 11
      4 -- 12
      4 -- 13

      5 -- 6
      6 -- 7
      8 -- 9
      9 -- 10
      11 -- 12
      12 -- 13

      5 -- 7
      8 -- 10
      11 -- 13
    }
    ```
  )
]

Let us choose node $1$ to be the vertex $u$. We get the following BFS Tree

#align(center)[
  #raw-render(
    ```dot
    graph {
      1 -- 2
      1 -- 3
      1 -- 4

      2 -- 5
      2 -- 6
      2 -- 7
      3 -- 8
      3 -- 9
      3 -- 10
      4 -- 11
      4 -- 12
      4 -- 13
    }
    ```
  )
]

$ "ecc"(u) = 2, F_0 ={1}, F_1 = {2, 3, 4}, F_2={5,6,7,8,9,10,11,12,13}, i=2, "lb" = 2, "ub"=4 $

Let us start the BFS traversals from the bottom right

First, we perform BFS on node $13$, and get the following BFS tree

#align(center)[
  #raw-render(
    ```dot
    graph {
      13 -- 12
      13 -- 11
      13 -- 4
      
      4 -- 1
      1 -- 2
      1 -- 3
      2 -- 5
      2 -- 6
      2 -- 7
      3 -- 8
      3 -- 9
      3 -- 10
    }
    ```
  )
]

$ "ecc"(13) = 4 > 2*(i-1), "since" i = 2 $
Thus, we terminate the BFS and find that the diameter is $4$.

We required a total of $2$ BFS calls in this example.

= Question 2

Commands used:
- `lscpu`
- `dmidecode`

== CPU

#table(
  columns: (1fr, 1fr),
  inset: 10pt,
  align: center,
  [Architecture], [x86_64],
  [Op Modes], [32-bit, 64-bit],
  [Address sizes], [48-bits physical, 48-bits virtual],
  [Byte order], [Little Endian],
  [CPUs], [16],
  [VendorID, Model Name], [AuthenticAMD, AMD Ryzen 7 5800H],
  [CPU Family], [25],
  [Model], [80],
  [Threads per core], [2],
  [Cores per socket], [8],
  [Sockets], [1],
  [Max MHz], [4463],
  [Min MHz], [400],
  [Cache size KB], [512],
)

== Memory Hierarchy

#table(
  columns: (1fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  align: center,
  [], [*L1*], [*L2*], [*L3*],
  [*Size*], [512 KB], [4 MB], [16 MB],
  [*Associativity*], [8-Way Set Associative], [8-Way Set Associative], [16-Way Set Associative],
  [**], [], [], [],
  [**], [], [], [],
)