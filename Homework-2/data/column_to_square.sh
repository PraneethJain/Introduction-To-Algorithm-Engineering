for i in {1..3}
do
    for x in {100..10000..100}
    do
        y=$(echo "100000000 / $x" | bc)
        echo -n "$x," >> "column_to_square_${i}.txt"
        ./a.out $y $x $i >> "column_to_square_${i}.txt"
    done
done