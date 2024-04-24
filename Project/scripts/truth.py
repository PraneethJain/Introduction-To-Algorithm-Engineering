import networkx as nx

def main() -> None:
    g = nx.Graph()
    with open(input(), "r") as f:
        edges = [tuple(map(int, line.strip().split(" "))) for line in f.readlines()][1:]
    g.add_edges_from(edges)

    ok = list(nx.biconnected_component_edges(g))
    print(f"NetworkX output: {len(ok)}")


if __name__ == "__main__":
    main()
