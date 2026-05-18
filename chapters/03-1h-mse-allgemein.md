---
title: "3.1.8 MSE in allgemeiner Form"
---

# 3.1.8 MSE in allgemeiner Form

Auch bei mehreren Merkmalen bleibt die Grundidee gleich: Gesucht sind die Modellparameter, die den mittleren quadratischen Fehler minimieren.

```{math}
\text{MSE}(\boldsymbol{\theta}) = \frac{1}{N}\sum_{i=1}^{N}(y_i - \hat{y}_i)^2
```

In Vektor- und Matrixschreibweise lautet dieselbe Idee:

```{math}
\text{MSE}(\boldsymbol{\theta}) = \frac{1}{N}\lVert \mathbf{y} - X\boldsymbol{\theta} \rVert^2
```

Die Formel sieht kompakter aus, beschreibt aber genau denselben Gedanken wie in einer Dimension: Vorhersagen sollen möglichst nah an den beobachteten Werten liegen.

Damit ist das Problem allgemein formuliert: Gesucht sind die Parameter $\boldsymbol{\theta}$, für die dieser Ausdruck minimal wird.

Weiter geht es mit [Ausblick und Notebook](03-1i-ausblick-und-notebook.md).