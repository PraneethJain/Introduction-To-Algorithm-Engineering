for i in {1..3}
do
    for x in {100..10000..100}
    do
        y=$(echo "100000000 / $x" | bc)
        echo -n "$x," >> "row_to_square_${i}.txt"
        ./a.out $x $y $i >> "row_to_square_${i}.txt"
    done
done