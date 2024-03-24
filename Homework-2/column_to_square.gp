set datafile separator ","

set title "Column to Square matrices"
set xlabel "Number of Columns"
set ylabel "Time (ms)"

set terminal png
set output "column_to_square.png"

plot "data/column_to_square_1.txt" using 1:2 with lines title "Naive", \
     "data/column_to_square_2.txt" using 1:2 with lines title "Recursive", \
     "data/column_to_square_3.txt" using 1:2 with lines title "Submatrix"