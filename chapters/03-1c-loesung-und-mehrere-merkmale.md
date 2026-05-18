---
title: "3.1.3 Lösung und mehrere Merkmale"
kernelspec:
  name: python3
  display_name: Python 3
---

# 3.1.3 Lösung und mehrere Merkmale

````{code-cell} python
:tags: remove-input

import numpy as np
import matplotlib.pyplot as plt

wohnflaeche = np.array([38, 42, 47, 51, 58, 63, 67, 72, 78, 85, 92, 105])
miete = np.array([590, 660, 710, 760, 870, 910, 980, 1040, 1180, 1290, 1410, 1620])
````

## Lösung des eindimensionalen linearen Regressionsproblems

In der Regel lässt sich so ein Optimierungsproblem nicht exakt durch eine Formel lösen, sondern es muss ein numerisches Verfahren verwendet werden.

Im Falle der linearen Regression in einer Dimension gibt es aber tatsächlich eine explizite Formel, die die optimalen Werte für $m$ und $b$ direkt berechnet.

:::{admonition} Satz: Lösung der linearen Regression in einer Dimension
Seien $N$ Datenpunkte $(x_i, y_i)$ für $i=1, \dots, N$ gegeben. Dann ist die Lösung des Minimierungsproblems

```{math}
\arg\min_{m,b} \frac{1}{N}\sum_{i=1}^{N}(y_i - (m x_i + b))^2
```

gegeben durch die folgenden Formeln:

```{math}
m = \frac{\sum_{i=1}^{N}(x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{N}(x_i - \bar{x})^2}
```

```{math}
b = \bar{y} - m\bar{x}
```
:::

:::{admonition} Beispiel: Berechnung der optimalen Parameter

````{code-cell} python
:tags: remove-input

x_mean = np.mean(wohnflaeche)
y_mean = np.mean(miete)
print(f"Mittelwert der Wohnfläche: {x_mean:.2f} m2")
print(f"Mittelwert der Miete: {y_mean:.2f} EUR")
````

````{code-cell} python
:tags: remove-input

m_opt = np.sum((wohnflaeche - x_mean) * (miete - y_mean)) / np.sum((wohnflaeche - x_mean) ** 2)
b_opt = y_mean - m_opt * x_mean
print(f"Steigung m: {m_opt:.2f}")
print(f"Achsenabschnitt b: {b_opt:.2f}")
````

````{code-cell} python
:tags: remove-input

x_line = np.linspace(35, 108, 200)
y_line = m_opt * x_line + b_opt

plt.figure(figsize=(7, 5))
plt.scatter(wohnflaeche, miete, label="Daten", color="#1d4f73")
plt.plot(x_line, y_line, label="Optimale Regressionsgerade", color="#c84c22")
plt.xlabel("Wohnfläche in m2")
plt.ylabel("Miete in EUR")
plt.title("Berechnete lineare Regression")
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
````

Die optimale Gerade ist also näherungsweise

```{math}
\hat{y} = 14.8x + 18
```

:::

## Mehrere Merkmale

In realen Anwendungen reicht eine einzige Variable oft nicht aus. Dann wird aus der linearen Regression in einer Dimension ein Modell mit mehreren Merkmalen.

:::{admonition} Einschub: Allgemeine Geradengleichung

Mit mehreren Merkmalen schreiben wir allgemeiner

```{math}
\hat{y} = w_1x_1 + w_2x_2 + \dots + w_dx_d + b
```

oder kompakt

```{math}
\hat{y} = \mathbf{w}^T\mathbf{x} + b
```

Die Koeffizienten $w_1, \dots, w_d$ geben an, wie stark sich die Vorhersage ändert, wenn sich das zugehörige Merkmal ändert und alle anderen gleich bleiben.
:::

Ein mögliches Modell für Wohnungen wäre zum Beispiel

```{math}
\hat{y} = 11x_1 - 32x_2 + 95x_3 + 240
```

mit

- $x_1$: Wohnfläche
- $x_2$: Entfernung zum Zentrum
- $x_3$: Balkon mit $1$ für ja und $0$ für nein

## MSE allgemein formuliert

Auch mit mehreren Merkmalen bleibt die Grundidee dieselbe: Gesucht sind die Modellparameter, die den mittleren quadratischen Fehler minimieren.

```{math}
\text{MSE}(\boldsymbol{\theta}) = \frac{1}{N}\sum_{i=1}^{N}(y_i - \hat{y}_i)^2
```

Mit Vektor- und Matrixschreibweise kann man das auch so ausdrücken:

```{math}
\text{MSE}(\boldsymbol{\theta}) = \frac{1}{N}\lVert \mathbf{y} - X\boldsymbol{\theta} \rVert^2
```

## Ausblick: Lösung des Systems

In einer Dimension konnten wir die Parameter mit einer expliziten Formel bestimmen. Bei mehreren Merkmalen wird daraus ein lineares Gleichungssystem beziehungsweise ein Optimierungsproblem.

Die rechnerische Lösung lässt sich dann zum Beispiel über

- die Normalgleichung
- numerische Optimierung
- oder später über Bibliotheken wie `scikit-learn`

finden.

Der Code zur linearen Regression wird im begleitenden Notebook besprochen: [Notebook zur linearen Regression](03-lineare-regression-code.ipynb).

Wenn du das Notebook direkt in einer interaktiven Umgebung öffnen willst, kannst du es auch in Google Colab starten: [Lineare Regression in Colab](https://colab.research.google.com/github/georgmerz/ki-modul/blob/main/chapters/03-lineare-regression-code.ipynb).

Danach folgt als nächstes Thema die [logistische Regression](03-2-logistische-regression.md).