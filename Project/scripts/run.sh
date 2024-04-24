#!/usr/bin/bash

FACTOR=100

k=$((1000*FACTOR))

make clean
make

rm "outputs/${FACTOR}"

for ((n=(10*FACTOR); 2*n<$k; n+=(10*FACTOR)))
do
  m=$((k - n))
  echo "$n $m"
  echo "$n $m" >> "outputs/${FACTOR}.txt"
  ./main "input_graphs/genrang/${n}_${m}.txt" >> "outputs/${FACTOR}.txt"
done
