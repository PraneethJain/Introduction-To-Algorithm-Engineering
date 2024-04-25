from os import system as sh
from math import isqrt

k = 1_000_000
sh(f"mkdir -p input_graphs/genrang/{k}")
for i in range(2, 51):
    print(i)
    n = (1 - 2 * i + isqrt((2 * i - 1) ** 2 + 8 * k * i)) // 2
    m = k - n
    sh(f"genrang -e{m} -g {n} 1 | showg -e | sed '1,2d' > input_graphs/genrang/{k}/{i}.txt")
