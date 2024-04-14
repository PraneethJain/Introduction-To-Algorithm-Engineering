#!/usr/bin/bash

make clean
make

for filename in ./input_graphs/*; do
  echo $filename
  ./main $filename
  python3 truth.py <<< $filename
done
