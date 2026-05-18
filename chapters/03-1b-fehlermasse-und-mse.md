---
title: "3.1.2 Fehlermaße und MSE"
kernelspec:
  name: python3
  display_name: Python 3
---

# 3.1.2 Fehlermaße und MSE

````{code-cell} python
:tags: remove-input

import numpy as np
import matplotlib.pyplot as plt
from jupyterquiz import display_quiz

wohnflaeche = np.array([38, 42, 47, 51, 58, 63, 67, 72, 78, 85, 92, 105])
miete = np.array([590, 660, 710, 760, 870, 910, 980, 1040, 1180, 1290, 1410, 1620])
````

## Der Mean Squared Error (MSE)

Wie schon erwähnt, wollen wir eine Gerade finden, die den Zusammenhang zwischen Wohnfläche und Miete möglichst gut beschreibt. Aber was bedeutet "gut" in diesem Kontext?
Eine Gerade passt dann "gut", wenn ihre Vorhersagen nahe an den beobachteten Punkten liegen.

Nehmen wir also an wir wollen eine Gerade $y = w_1 x + w_0$ bewerten. Für einen einzelnen Datenpunkt $(x_i, y_i)$ berechnet das Modell zunächst die Vorhersage

```{math}
f(x_i) = \hat{y}_i = w_1 x_i + w_0
```

Der erste Ansatz wäre es zu schauen, wie weit die Vorhersage $\hat{y}_i$ von dem tatsächlichen Wert $y_i$ entfernt ist:

```{math}
e_i = y_i - \hat{y}_i
```

Dieser Wert wird Residuum genannt.

````{code-cell} python
:tags: remove-input

x = wohnflaeche
y = miete
m = 10
b = 220
y_hat = m * x + b

plt.figure(figsize=(7, 5))
plt.scatter(x, y, label="Daten", color="#1d4f73")
plt.plot(x, y_hat, label="Beispielgerade", color="#c84c22")

for xi, yi, yhi in zip(x, y, y_hat):
    plt.plot([xi, xi], [yi, yhi], linestyle="--", color="#8a8174", linewidth=1.5, alpha=0.9)

plt.xlabel("Wohnfläche in m2")
plt.ylabel("Miete in EUR")
plt.title("Residuen zur Beispielgeraden")
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
````

Um die gesamte Gerade zu bewerten, könnte man die Abweichungen für alle Datenpunkte addieren. Dabei könnte es passieren, dass sich positive und negative Abweichungen gegenseitig aufheben.

Eine Möglichkeit wäre es, die absoluten Werte der Abweichungen zu betrachten. Das führt zum mittleren absoluten Fehler (MAE):

```{math}
\text{MAE} = \frac{1}{N}\sum_{i=1}^{N}|y_i - \hat{y}_i|
```

In der Praxis wird aber meist eine andere Variante verwendet: die Abweichungen werden quadriert. Das führt zum mittleren quadratischen Fehler (MSE):

:::{admonition} Definition: Mean Squared Error (MSE)

Gegeben seien $N$ Datenpunkte mit beobachteten Zielwerten $y_i$ und vorhergesagten Zielwerten $\hat{y}_i$. Der Mean Squared Error (MSE) ist definiert als:

```{math}
\text{MSE} = \frac{1}{N}\sum_{i=1}^{N}(y_i - \hat{y}_i)^2
```

:::

:::{admonition} Einschub: Das Summenzeichen $\sum$

Das Summenzeichen $\sum$ ist eine mathematische Notation, die verwendet wird, um die Summe einer Reihe von Termen auszudrücken. So bedeutet zum Beispiel

```{math}
\sum_{i=1}^{5} 1/i = 1 + 1/2 + 1/3 + 1/4 + 1/5
```

oder für den MSE:

```{math}
\sum_{i=1}^{n}(y_i - \hat{y}_i)^2 = (y_1 - \hat{y}_1)^2 + (y_2 - \hat{y}_2)^2 + \dots + (y_n - \hat{y}_n)^2
```

Kurze Übung: Schreibe die Summe der Zahlen explizit aus.

````{code-cell} python
:tags: remove-input

display_quiz([
  {
    "question": "Schreibe die Summanden von $\\sum_{i=1}^{4} (2i+1)$ explizit hin.",
    "type": "string",
    "answers": [
      {"answer": "3+5+7+9", "correct": True, "feedback": "Richtig. Für i = 1, 2, 3, 4 erhält man die Summanden 3, 5, 7 und 9.", "match_case": False, "fuzzy_threshold": 0.95},
      {"answer": "3 + 5 + 7 + 9", "correct": True, "feedback": "Richtig. Für i = 1, 2, 3, 4 erhält man die Summanden 3, 5, 7 und 9.", "match_case": False, "fuzzy_threshold": 0.95},
      {"type": "default", "feedback": "Noch nicht richtig. Setze nacheinander i = 1, 2, 3 und 4 in 2i + 1 ein und schreibe dann die entstehenden Summanden mit Pluszeichen auf."}
    ]
  }
], colors="fdsp")
````

:::

:::{admonition} Bemerkung
Der MSE ist eine gebräuchliche Wahl, weil er mathematisch gut handhabbar ist und die Quadrate der Abweichungen stärker gewichtet als die absoluten Werte.
:::

:::{admonition} Mini-Quiz: MSE verstehen

````{code-cell} python
:tags: remove-input

display_quiz([
  {
    "question": "Welche der folgenden Aussagen zum MSE und zu den Residuen sind wahr? Wähle alle zutreffenden Aussagen aus.",
    "type": "many_choice",
    "answers": [
      {"answer": "Die Summe der Residuen kann 0 sein, obwohl die Gerade nicht durch alle Punkte geht.", "correct": True, "feedback": "Richtig. Positive und negative Residuen können sich gegenseitig aufheben, obwohl einzelne Fehler noch vorhanden sind."},
      {"answer": "Der MSE kann 0 sein, obwohl die Gerade nicht durch alle Punkte geht.", "correct": False, "feedback": "Nicht richtig. Der MSE ist nur dann 0, wenn alle quadrierten Fehler 0 sind, also die Gerade durch alle Punkte geht."},
      {"answer": "Der MAE kann 0 sein, obwohl die Gerade nicht durch alle Punkte geht.", "correct": False, "feedback": "Nicht richtig. Auch der MAE ist nur dann 0, wenn alle absoluten Fehler 0 sind, also die Gerade durch alle Punkte geht."},
      {"answer": "Wir suchen diejenige Gerade, für die der MSE möglichst klein ist.", "correct": True, "feedback": "Richtig. Genau das ist die Grundidee der linearen Regression in diesem Kapitel."}
    ]
  }
], colors="fdsp")
````

:::

### Mathematische Formulierung des linearen Regressionsproblems in einer Dimension

Noch einmal in Worten: Wir wollen die Gerade $y = w_1 x + w_0$ finden, für die der MSE minimal wird.

```{math}
\text{MSE}(w_1,w_0) = \frac{1}{N}\sum_{i=1}^{N}(y_i - (w_1 x_i + w_0))^2
```

:::{admonition} Formulierung als Optimierungsproblem
Gegeben seien $N$ Datenpunkte $(x_i, y_i)$ für $i=1, \dots, N$. Gesucht sind die Parameter $m$ und $b$, für die der MSE minimal wird:

```{math}
(m^*, b^*) = \arg\min_{m,b} MSE(m,b) = \arg\min_{m,b} \frac{1}{N}\sum_{i=1}^{N}(y_i - (m x_i + b))^2
```
:::

:::{admonition} Interaktive Übung: Finde die beste Gerade von Hand

Bevor wir eine Formel einsetzen, lohnt sich ein Blick auf die Aufgabe mit den Augen. Versuche im folgenden Widget, eine möglichst "gute" Gerade selbst einzustellen.

````{anywidget} ../widgets/regression-playground.mjs
:css: ../widgets/interactive-plots.css
{
  "points": [[38, 590], [42, 660], [47, 710], [51, 760], [58, 870], [63, 910], [67, 980], [72, 1040], [78, 1180], [85, 1290], [92, 1410], [105, 1620]],
  "m": 11,
  "b": 180
}
````

:::

Weiter geht es mit [Lösung und mehrere Merkmale](03-1c-loesung-und-mehrere-merkmale.md).