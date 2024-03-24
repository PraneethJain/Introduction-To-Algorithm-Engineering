set datafile separator ","

set title "Row to Square matrices"
set xlabel "Number of Rows"
set ylabel "Time (ms)"

set terminal png
set output "row_to_square.png"

plot "data/row_to_square_1.txt" using 1:2 with lines title "Naive", \
     "data/row_to_square_2.txt" using 1:2 with lines title "Recursive", \
     "data/row_to_square_3.txt" using 1:2 with lines title "Submatrix"