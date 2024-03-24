set datafile separator ","

set title "Square matrices"
set xlabel "Matrix size"
set ylabel "Time (ms)"

set terminal png
set output "square.png"

plot "data/square_1.txt" using 1:2 with lines title "Naive", \
     "data/square_2.txt" using 1:2 with lines title "Recursive", \
     "data/square_3.txt" using 1:2 with lines title "Submatrix"