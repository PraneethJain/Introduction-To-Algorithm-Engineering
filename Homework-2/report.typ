#set text(font: "Inter", fill: rgb("#222222"), hyphenate: false, size: 9pt)

#align(center, text(17pt)[*Introduction to Algorithm Engineering*])
#align(center, text(16pt)[Homework-2])
#align(center, text(13pt)[Moida Praneeth Jain, 2022101093])
#import "@preview/diagraph:0.2.1": *

= Question 1

Consider graph $G$ with $12$ vertices and $18$ edges, as shown below
#align(center)[
  #raw-render(
    ```dot
    graph {
      1 -- 2
      2 -- 3
      3 -- 4
      4 -- 5
      5 -- 6
      6 -- 1

      7 -- 8
      8 -- 9
      9 -- 10
      10 -- 11
      11 -- 12
      12 -- 7

      1 -- 7
      2 -- 8
      3 -- 9
      4 -- 10
      5 -- 11
      6 -- 12

    }
    ```
  , height: 60em)
]

Now, we perform the following DFS traversal, picking the root node as $1$
$ 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 12 -> 11 -> 10 -> 9 -> 8 -> 7 $

We construct a directed graph, with edges as part of the DFS tree pointing towards the root, and the non-tree edges pointing away from the root



#grid(
  columns: 2,
  gutter: 0pt,
  align(left)[
  #raw-render(
    ```dot
    digraph {
      1 -> 6
      1 -> 7
      2 -> 8
      3 -> 9
      4 -> 10
      5 -> 11
      12 -> 11

      11 -> 10
      10 -> 9
      9 -> 8
      8 -> 7
      7 -> 12
      12 -> 6
      6 -> 5
      5 -> 4
      4 -> 3
      3 -> 2
      2 -> 1
    }
    ```
  , height: 70em)
], [

  === Back Edge 1 - 6
  $P_0 = 1-2$

  $P_1 = 1-6-5-4-3-2$
  
  $"visited" = {1,2,3,4,5,6}$
  === Back Edge 1 - 7
  $P_2 = 1-7-12-6$

  $"visited" = {1,2,3,4,5,6,7,12}$
  === Back Edge 2 - 8
  $P_3 = 2-8-7$

  $"visited" = {1,2,3,4,5,6,7,8,12}$
  === Back Edge 3 - 9
  $P_4 = 3-9-8$

  $"visited" = {1,2,3,4,5,6,7,8,9,12}$
  === Back Edge 4 - 10
  $P_5 = 4-10-9$

  $"visited" = {1,2,3,4,5,6,7,8,9,10,12}$
  === Back Edge 5 - 11
  $P_6 = 5-11-10$

  $"visited" = {1,2,3,4,5,6,7,8,9,10,11,12}$
  === Back Edge 12 - 11
  $P_7 = 12-11$

  $"visited" = {1,2,3,4,5,6,7,8,9,10,11,12}$

  \
  \

  ${P_i}$ is the ear decomposition

  \
  \
  Below is a visual representation of the

  chain decomposition of the graph
],
)

#align(center)[
  #raw-render(
    ```dot
    graph {
      Edge [penwidth = 5]
      1 -- 2 [color="red"]
      2 -- 3  [color="blue"]
      3 -- 4 [color="blue"]
      4 -- 5 [color="blue"]
      5 -- 6 [color="blue"]
      6 -- 1 [color="blue"]

      7 -- 8 [color="blueviolet"]
      8 -- 9 [color="brown"]
      9 -- 10 [color="cyan"]
      10 -- 11 [color="darkgoldenrod1"]
      11 -- 12 [color="pink"]
      12 -- 7 [color="chartreuse"]

      1 -- 7 [color="chartreuse"]
      2 -- 8 [color="blueviolet"]
      3 -- 9 [color="brown"]
      4 -- 10 [color="cyan"]
      5 -- 11 [color="darkgoldenrod1"]
      6 -- 12 [color="chartreuse"]

    }
    ```
  , height:80em)
]

= Question 2

== Square Matrices
#figure(
  image("square.png", width: 80%),
  caption: [
    Variation in transpose time with size of square matrices
  ],
) <square>
First, let us consider the case of square matrices. As we can observe from @square, the trend is quadratic, as was noted in Homework 1. In the naive case, we get $O(N^2)$, and for the recursive and submatrix case, we get $O(N^2/B)$

== Row Matrices
#figure(
  image("row_to_square.png", width: 80%),
  caption: [
    Variation in transpose time with rows of matrix. (1e8 matrix entries) 
  ],
) <row_to_square>

We fix the total number of elements in the matrix to `1e8`, and increase the number of rows to `1e4` while decreasing the number of columns from `1e8`, i.e, the plot represents the transpose time as the graph transitions from a row matrix to a square matrix.

From @row_to_square we observe that the times are approximately constant. This is because in these matrices, each row has more elements than the cache can fit, thus the cache hit/miss rate remains constant throughout.

== Column Matrices
#figure(
  image("column_to_square.png", width: 80%),
  caption: [
    Variation in transpose time with columns of matrix. (1e8 matrix entries) 
  ],
) <column_to_square>

We fix the total number of elements in the matrix to `1e8`, and increase the number of columns to `1e4` while decreasing the number of rows from `1e8`, i.e, the plot represents the transpose time as the graph transitions from a column matrix to a square matrix.

The key point to note from @column_to_square is that these times are much higher than the row matrices. This is because column matrices are much worse for cache access than row matrices. At around `3000` columns, the times go back down. This is where the number of elements in each row (the number of columns) is large enough for the cache to get filled up.