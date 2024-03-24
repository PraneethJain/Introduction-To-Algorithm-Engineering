for i in {1..3}
do
    for n in {100..10000..100}
    do
        echo -n "$n," >> "square_${i}.txt"
        ./a.out $n $n $i >> "square_${i}.txt"
    done
done