from os import system as sh

k = 1_000_000
sh("mkdir -p input_graphs/bridge_graphs")
for b in range(10_000, 135_001, 2500):
    n = int((k - b) // 2)
    m = k - n
    nb = m - b
    small_sz = int(nb // (b + 1))
    big_no = int(nb % 3)
    cur_file = f"input_graphs/bridge_graphs/{b:06}_bridges.txt"
    with open(cur_file, "w") as f:
        # sh(f"echo {n} {m} > {cur_file}")
        f.write(f"{n} {m}\n")
        last = -1
        for i in range(b + 1):
            if i < big_no:
                if last == -1:
                    for j in range(0, small_sz + 1):
                        f.write(f"{j} {(j + 1) % (small_sz + 1)}\n")
                    f.write(f"{small_sz} {small_sz + 1}\n")
                    last = small_sz + 1
                else:
                    for j in range(0, small_sz + 1):
                        f.write(f"{last + j} {last + (j + 1) % (small_sz + 1)}\n")
                    if i != b:
                        f.write(f"{last + small_sz} {last + small_sz + 1}\n")
                        last = last + small_sz + 1
                continue
            if last == -1:
                for j in range(0, small_sz):
                    f.write(f"{j} {(j + 1) % (small_sz)}\n")
                f.write(f"{small_sz - 1} {small_sz}\n")
                last = small_sz
            else:
                for j in range(0, small_sz):
                    f.write(f"{last + j} {last + (j + 1) % (small_sz)}\n")
                if i != b:
                    f.write(f"{last + small_sz - 1} {last + small_sz}\n")
                    last = last + small_sz
    print(f"done with {cur_file}")