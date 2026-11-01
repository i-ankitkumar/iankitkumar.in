---
name: "IDS using MLP + GridSearchCV"
type: "Open Source"
status: "research"
period: "2022"
summary: "Open-source intrusion-detection experiments using a multilayer perceptron with hyperparameter search via GridSearchCV. Academic / research side of my security interest."
problem: "Test how a small, well-tuned MLP performs on a standard intrusion-detection dataset compared to off-the-shelf baselines — and understand the hyperparameter landscape."
architecture: "Sklearn pipeline with feature scaling, an MLPClassifier, and GridSearchCV over hidden-layer sizes, activation, solver, and alpha. Train/test split stratified; metrics on accuracy, precision/recall, and F1."
implementation: "Jupyter-driven experiments; the MLP pipeline exported to a runnable script with reproducible seeds. Results plotted across hyperparameter combinations."
results: "Directional insight into where classical ML helps on this kind of tabular IDS data. Repo published as a learning artifact, not a production detector."
stack:
  - "Python"
  - "scikit-learn"
  - "Pandas"
  - "NumPy"
tags:
  - "ML"
  - "Security"
  - "Research"
links:
  - label: "View on GitHub"
    href: "https://github.com/i-ankitkumar/IDS_using_MLP-GridSearchCV"
    external: true
featured: false
order: 40
confirm: false
---