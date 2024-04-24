import networkx as nx


def main() -> None:
    n, m = map(int, input().split())
    g = nx.dense_gnm_random_graph(n, m)
    print(f"{n} {m}")
    for u, v in g.edges():
        print(f"{u} {v}")


if __name__ == "__main__":
    main()
