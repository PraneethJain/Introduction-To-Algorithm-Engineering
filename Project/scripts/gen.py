from os import system as sh
from math import isqrt

k = 1_000_000
sh(f"mkdir -p input_graphs/genrang/{k}")
for i in range(2, 51):
    print(i)
    n = (i - 200 + isqrt((200 - i) ** 2 + 800 * k * i)) // (2 * i)
    m = k - n
    sh(
        f"genrang -e{m} -g {n} 1 | showg -e | sed '1,2d' > input_graphs/genrang/{k}/{i}.txt"
    )
