#!/usr/bin/bash


k=1000000

make clean
make

rm "outputs/genrang/${k}.txt"
rm "outputs/complete_graphs/data.txt"

mkdir -p "outputs/genrang"
mkdir -p "outputs/complete_graphs"

for file in "input_graphs/genrang/${k}"/*
do
  echo $file
  ./main "${file}" >> "outputs/genrang/${k}.txt"
done

for file in "input_graphs/complete_graphs"/*
do
  echo $file
  ./main "${file}" >> "outputs/complete_graphs/data.txt"
done
