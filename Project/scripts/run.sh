#!/usr/bin/bash


k=1000000

make clean
make

rm "outputs/${k}.txt"

for file in "input_graphs/genrang/${k}"/*
do
  echo $file
  ./main "${file}" >> "outputs/${k}.txt"
done
