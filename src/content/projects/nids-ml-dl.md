---
name: "NIDS using ML and DL"
type: "Open Source"
status: "research"
period: "2022"
summary: "Network intrusion detection with classical ML and deep learning approaches, parallel to the MLP experiment. Open source; a learning artifact, not a production system."
problem: "Compare classical ML (Random Forest, XGBoost-style trees) against small DL architectures on a public NIDS dataset — and surface where each approach is strong or weak."
architecture: "Same sklearn-style pipeline as the IDS_using_MLP repo, extended with a small Keras/TensorFlow model. Preprocessing identical so results are comparable."
implementation: "Two notebooks / scripts side by side, both writing metrics to the same output format for direct comparison."
results: "Useful comparison data for future work. Code is reproducible; the dataset and metrics are public."
stack:
  - "Python"
  - "scikit-learn"
  - "TensorFlow / Keras"
  - "Pandas"
tags:
  - "ML"
  - "DL"
  - "NIDS"
links:
  - label: "View on GitHub"
    href: "https://github.com/i-ankitkumar/NIDS_using_MLandDL"
    external: true
featured: false
order: 50
confirm: false
---