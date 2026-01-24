import matplotlib.colors as colors
import matplotlib.pyplot as plt
import numpy as np
import zstandard as zstd


def generate_embeddings(n, d):
    # Standard normal distribution
    x = np.random.randn(n, d).astype(np.float32)
    # Normalize to unit sphere
    norms = np.linalg.norm(x, axis=1, keepdims=True)
    x = x / norms
    return x


def transpose_data(data):
    return data.T.copy()


def shuffle_bytes(data):
    data_bytes = data.view(np.uint8)
    n_floats = data.size
    reshaped = data_bytes.reshape(n_floats, 4)
    transposed_bytes = reshaped.T.copy()
    return transposed_bytes.tobytes()


def unshuffle_bytes(byte_data, n_floats):
    arr = np.frombuffer(byte_data, dtype=np.uint8)
    arr = arr.reshape(4, n_floats)
    arr = arr.T.copy()
    return arr.view(np.float32)


def cartesian_to_spherical(x):
    n, d = x.shape
    x_dbl = x.astype(np.float64)
    ang = np.zeros((n, d - 1), dtype=np.float64)
    x2 = x_dbl**2
    r2 = np.cumsum(x2[:, ::-1], axis=1)[:, ::-1]
    for i in range(d - 2):
        r = np.sqrt(r2[:, i])
        valid = r > 1e-12
        val = np.zeros_like(r)
        val[valid] = x_dbl[valid, i] / r[valid]
        val = np.clip(val, -1.0, 1.0)
        ang[:, i] = np.arccos(val)
    ang[:, -1] = np.arctan2(x_dbl[:, -1], x_dbl[:, -2])
    return ang.astype(np.float32)


def spherical_to_cartesian(ang):
    n, d_minus_1 = ang.shape
    d = d_minus_1 + 1
    ang_dbl = ang.astype(np.float64)
    x = np.zeros((n, d), dtype=np.float64)
    sin_prod = np.ones(n, dtype=np.float64)
    for i in range(d - 2):
        x[:, i] = sin_prod * np.cos(ang_dbl[:, i])
        sin_prod *= np.sin(ang_dbl[:, i])
    x[:, d - 2] = sin_prod * np.cos(ang_dbl[:, -1])
    x[:, d - 1] = sin_prod * np.sin(ang_dbl[:, -1])
    return x.astype(np.float32)


def compress_pipeline(data, m, b):
    # Transformation: y = m*x + b
    # Use float32 arithmetic
    m_f32 = np.float32(m)
    b_f32 = np.float32(b)

    transformed_data = data * m_f32 + b_f32

    # Transpose
    transposed = transpose_data(transformed_data)

    # Shuffle
    shuffled_bytes = shuffle_bytes(transposed.flatten())

    # Zstd
    cctx = zstd.ZstdCompressor(level=1)
    compressed = cctx.compress(shuffled_bytes)
    return compressed


def decompress_pipeline(compressed, shape, m, b):
    # Decompress
    dctx = zstd.ZstdDecompressor()
    decompressed_bytes = dctx.decompress(compressed)

    # Unshuffle
    n_floats = np.prod(shape)
    unshuffled = unshuffle_bytes(decompressed_bytes, n_floats)

    # Untranspose
    d, n = shape[1], shape[0]
    transposed = unshuffled.reshape(d, n)
    transformed_data = transposed.T.copy()

    # Inverse Transformation: x = (y - b) / m
    m_f32 = np.float32(m)
    b_f32 = np.float32(b)

    data = (transformed_data - b_f32) / m_f32
    return data


def run_experiment_and_viz():
    N = 2000
    D = 1024
    print(f"Generating {N}x{D} vectors...")
    data = generate_embeddings(N, D)
    original_size = data.nbytes
    print(f"Original size: {original_size / 1024 / 1024:.2f} MB")

    # Define Grid
    # We want to explore biases that push us into different exponent buckets
    # and multipliers that might scale the noise/signal ratio.

    # Biases: from 0 to 5.0 to cover the interesting transitions
    biases = np.linspace(0, 5.0, 51)

    # Multipliers: Range from near-zero to 1.2
    multipliers = np.linspace(0.01, 1.2, 25)

    results_ratio = np.zeros((len(multipliers), len(biases)))
    results_error = np.zeros((len(multipliers), len(biases)))

    pareto_points = []

    # --- Calculate Real Spherical Transform ---
    print("Calculating actual Spherical Transform metrics...")
    # 1. Transform
    sph_ang = cartesian_to_spherical(data)
    # 2. Transpose
    sph_transposed = transpose_data(sph_ang)
    # 3. Shuffle
    sph_shuffled = shuffle_bytes(sph_transposed.flatten())
    # 4. Compress
    cctx = zstd.ZstdCompressor(level=1)
    sph_compressed = cctx.compress(sph_shuffled)

    sph_ratio = original_size / len(sph_compressed)

    # Decompress to check error
    dctx = zstd.ZstdDecompressor()
    sph_decompressed = dctx.decompress(sph_compressed)
    sph_unshuffled = unshuffle_bytes(sph_decompressed, sph_ang.size)
    sph_restored_ang = sph_unshuffled.reshape(
        sph_ang.shape[1], sph_ang.shape[0]
    ).T.copy()
    sph_restored = spherical_to_cartesian(sph_restored_ang)
    sph_error = np.max(np.abs(data - sph_restored))

    print(f"Real Spherical: Ratio={sph_ratio:.2f}x, Error={sph_error:.2e}")

    print(f"Running sweep over {len(biases) * len(multipliers)} configurations...")

    for i, m in enumerate(multipliers):
        for j, b in enumerate(biases):
            compressed = compress_pipeline(data, m, b)
            comp_size = len(compressed)
            ratio = original_size / comp_size

            restored = decompress_pipeline(compressed, data.shape, m, b)
            max_err = np.max(np.abs(data - restored))

            results_ratio[i, j] = ratio
            results_error[i, j] = max_err

            pareto_points.append({"m": m, "b": b, "ratio": ratio, "error": max_err})

    # Prepare specific reference points
    refs = [
        {"label": "Baseline (Raw)", "m": 1.0, "b": 0.0},
        {"label": "Bias=1.57", "m": 1.0, "b": 1.570796},
        # {'label': 'Bias=3.0', 'm': 1.0, 'b': 3.0},
        # {'label': 'Bias=4.0', 'm': 1.0, 'b': 4.0},
    ]

    ref_data = []
    for r in refs:
        c = compress_pipeline(data, r["m"], r["b"])
        s = len(c)
        rat = original_size / s
        res = decompress_pipeline(c, data.shape, r["m"], r["b"])
        err = np.max(np.abs(data - res))
        ref_data.append({"label": r["label"], "ratio": rat, "error": err})

    # Add real spherical
    ref_data.append({"label": "Real Spherical", "ratio": sph_ratio, "error": sph_error})

    # --- Plotting ---

    # 1. Heatmap: Compression Ratio
    plt.figure(figsize=(10, 8))
    plt.imshow(
        results_ratio,
        aspect="auto",
        origin="lower",
        extent=[biases.min(), biases.max(), multipliers.min(), multipliers.max()],
        cmap="viridis",
    )
    plt.colorbar(label="Compression Ratio")
    plt.xlabel("Bias (b)")
    plt.ylabel("Multiplier (m)")
    plt.title("Compression Ratio Heatmap (y = mx + b)")
    plt.tight_layout()
    plt.savefig("heatmap_ratio.png")
    print("Saved heatmap_ratio.png")

    # 2. Heatmap: Max Error (Log Scale)
    plt.figure(figsize=(10, 8))
    # Use log norm for error, handling 0 error if present (add epsilon)
    vmin_err = max(1e-10, results_error.min()) if results_error.min() > 0 else 1e-10

    plt.imshow(
        results_error + 1e-12,
        aspect="auto",
        origin="lower",
        extent=[biases.min(), biases.max(), multipliers.min(), multipliers.max()],
        norm=colors.LogNorm(vmin=vmin_err, vmax=results_error.max()),
        cmap="RdYlGn_r",
    )  # Green (Low Error) -> Red (High Error)
    plt.colorbar(label="Max Error (Log Scale)")
    plt.xlabel("Bias (b)")
    plt.ylabel("Multiplier (m)")
    plt.title("Reconstruction Error Heatmap (y = mx + b)")
    plt.tight_layout()
    plt.savefig("heatmap_error.png")
    print("Saved heatmap_error.png")

    # 3. Pareto Frontier Curve
    plt.figure(figsize=(12, 8))

    # Extract arrays
    all_errors = np.array([p["error"] for p in pareto_points])
    all_ratios = np.array([p["ratio"] for p in pareto_points])
    all_ms = np.array([p["m"] for p in pareto_points])

    # Scatter plot (filter 0 error for log scale)
    mask = all_errors > 0
    sc = plt.scatter(
        all_errors[mask],
        all_ratios[mask],
        alpha=0.5,
        s=15,
        c=all_ms[mask],
        cmap="viridis",
        label="Sweep Points",
    )
    plt.colorbar(sc, label="Multiplicand (m)")

    # Plot reference points
    colors_ref = ["red", "blue", "green", "purple", "black"]
    markers_ref = ["o", "*", "^", "D", "X"]
    for idx, rd in enumerate(ref_data):
        err_val = rd["error"] if rd["error"] > 0 else 1e-10  # handle 0 for log plot
        plt.scatter(
            [err_val],
            [rd["ratio"]],
            color=colors_ref[idx],
            s=150,
            marker=markers_ref[idx],
            label=rd["label"],
            zorder=10,
        )
        plt.annotate(
            rd["label"],
            (err_val, rd["ratio"]),
            xytext=(0, 10),
            textcoords="offset points",
            ha="center",
            fontsize=9,
            fontweight="bold",
        )

    # Calculate Pareto Frontier
    # Sort by error
    sorted_indices = np.argsort(all_errors)
    sorted_errors = all_errors[sorted_indices]
    sorted_ratios = all_ratios[sorted_indices]

    pareto_x = []
    pareto_y = []
    current_max_ratio = -1.0

    for err, rat in zip(sorted_errors, sorted_ratios):
        if rat > current_max_ratio:
            pareto_x.append(err)
            pareto_y.append(rat)
            current_max_ratio = rat

    # Filter 0 errors for log plot line
    px = np.array(pareto_x)
    py = np.array(pareto_y)
    p_mask = px > 0

    plt.plot(px[p_mask], py[p_mask], "k--", linewidth=2, label="Pareto Frontier")

    plt.xscale("log")
    plt.xlabel("Max Reconstruction Error (Log Scale)")
    plt.ylabel("Compression Ratio")
    plt.title("Pareto Frontier: Compression vs. Error (Linear Transform)")
    plt.grid(True, which="both", ls="-", alpha=0.2)

    # Annotate safe zone
    plt.axvline(x=1.19e-7, color="orange", linestyle=":", linewidth=2)
    plt.text(
        1.3e-7,
        plt.ylim()[0] + 0.1,
        "Float32 Epsilon",
        color="orange",
        rotation=90,
        verticalalignment="bottom",
    )

    plt.legend()
    plt.tight_layout()
    plt.savefig("pareto_frontier.png")
    print("Saved pareto_frontier.png")


if __name__ == "__main__":
    run_experiment_and_viz()
