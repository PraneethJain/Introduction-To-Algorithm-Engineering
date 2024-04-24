#!/usr/bin/bash

FACTOR=100

k=$((1000*FACTOR))

for ((n=(10*FACTOR); 2*n<$k; n+=(10*FACTOR)))
do
  m=$((k - n))
  echo "$n $m"
  genrang -e$m -g $n 1 | showg -e | sed '1,2d' > "input_graphs/genrang/${n}_${m}.txt"
done
