#set text(font: "Inter", fill: rgb("#222222"), hyphenate: false, size: 9pt)

#align(center, text(17pt)[*Introduction to Algorithm Engineering*])
#align(center, text(16pt)[Homework-2])
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

    }
    ```
  )
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