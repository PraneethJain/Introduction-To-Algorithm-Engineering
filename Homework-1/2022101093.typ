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

Commands/Files used:
- `lscpu`
- `dmidecode`
- `/proc/cpuinfo`
- `/proc/meminfo`

== General
\

#table(
  columns: (1fr, 1fr),
  inset: 10pt,
  align: center,
  [*Manufacturer*], [LENOVO],
  [*Product Name*], [82JU],
  [*Version*], [Legion 5 15ACH6H],
)

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

== Cache

#table(
  columns: (1fr, 1fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  align: center,
  [], [*L1_Data*], [*L1_Instruction*], [*L2*], [*L3*],
  [*Size*], [8x 32 KB], [8x 32 KB], [8x 512 KB], [16 MB],
  [*Associativity*], [8-Way Set Associative], [8-Way Set Associative], [8-Way Set Associative],[16-Way Set Associative],
  [*Access Times*], [1.67ns], [1.67ns], [10.1ns], [75.7ns],
)

== RAM

#table(
  columns: (1fr, 1fr),
  inset: 10pt,
  align: center,
  [*Type*], [DDR4],
  [*Size*], [16 GB],
  [*DRAM Frequency*], [1600 MHz],
)

= Question 3
The pseudocode for transposing an $n times n$ matrix $A$ and storing it in $B$ is as follows 
```
MatrixTranspose(A, B, N)
Begin
  for i = 1 to N do
    for j = 1 to N do
      B[j][i] = A[i][j]
    end-for
  end-for
End
```

Since we are reading matrix $A$ in row-order, we  get $N^2/B$ cache-misses while reading

Since we are writing to matrix $B$, the I/O operations is $N^2$ writes

Thus, the total number of I/O operations is $N^2 + N^2/B$