from os import system as sh

sh(f"mkdir -p input_graphs/complete_graphs")
for n in range(100, 10100, 100):
    sh(
        f"genrang -P1 -g {n} 1 | showg -e | sed '1,2d' > input_graphs/complete_graphs/{n:05}.txt"
    )
