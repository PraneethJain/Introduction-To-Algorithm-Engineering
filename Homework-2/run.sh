#!/usr/bin/bash

g++ -O1 transpose.cpp
mv ./a.out ./data/a.out

cd data
# rm *.txt

# echo "Running square matrices"
# ./square.sh

# echo "Running column to square matrices"
# ./column_to_square.sh

# echo "Running row to square matrices"
# ./row_to_square.sh

rm ./a.out
cd ..

echo "Generating plots"
gnuplot square.gp
gnuplot row_to_square.gp
gnuplot column_to_square.gp
