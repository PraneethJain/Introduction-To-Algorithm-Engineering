import networkx as nx


def main() -> None:
    g = nx.Graph()
    with open(input("input graph path: "), "r") as f:
        edges = [tuple(map(int, line.strip().split(" "))) for line in f.readlines()][1:]
    g.add_edges_from(edges)
    print(len(list(nx.biconnected_components(g))))



if __name__ == "__main__":
    main()
