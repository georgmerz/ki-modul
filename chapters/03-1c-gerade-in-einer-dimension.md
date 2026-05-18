---
title: "3.1.3 Gerade in einer Dimension"
kernelspec:
  name: python3
  display_name: Python 3
---

# 3.1.3 Lineare Regression in einer Dimension
````{code-cell} python
:tags: remove-input

import numpy as np
import matplotlib.pyplot as plt
from jupyterquiz import display_quiz

wohnflaeche = np.array([38, 42, 47, 51, 58, 63, 67, 72, 78, 85, 92, 105])
miete = np.array([590, 660, 710, 760, 870, 910, 980, 1040, 1180, 1290, 1410, 1620])
````

Bevor wir die allgemeine Form der linearen Regression mit mehreren Merkmalen betrachten, konzentrieren wir uns zunächst auf die einfachste Variante: die lineare Regression in einer Dimension.

In diesem Fall haben wir nur ein Merkmal, zum Beispiel die Wohnfläche $x$, und wollen die Miete $y$ vorhersagen.

Wir gehen außerdem davon aus, dass wir insgesamt $N$ Datenpunkte haben, also $N$ Wohnungen mit bekannten Wohnflächen und Mieten. Diese Datenpunkte können wir als Paare $(x_i, y_i)$ darstellen, wobei $i$ von $1$ bis $N$ läuft und $x_i,y_i\in\mathbb{R}$ sind.
D.h. in unserem Beispiel haben wir $N=12$ Wohnungen und die Paare $\{(38, 590), (42, 660), \dots, (105, 1620)\}$.

Oder anders gesagt z.B. $x_1=38$  und $y_1=590$ , $x_2=42$  und $y_2=660$, usw.
:::{admonition} Einschub: Die Geradengleichung in der Ebene

Eine Gerade in der Ebene wird beschrieben durch

```{math}
y = mx + b
```

Dabei ist $m$ die Steigung und $b$ der Achsenabschnitt.

Die Steigung $m$ gibt an, wie stark sich $y$ ändert, wenn sich $x$ um eine Einheit ändert. Der Achsenabschnitt $b$ gibt an, welchen Wert $y$ annimmt, wenn $x=0$ ist.

In diesem Kurs verwenden wir dafür später auch häufig die Notation $m=w_1$ und $b=w_0$. Beide Schreibweisen meinen dieselben beiden Parameter der Geraden.

Diese Schreibweise ist nützlich, weil sie sich gut auf die mehrdimensionale lineare Regression übertragen lässt, bei der später mehrere Gewichte $w_1, w_2, \dots$ auftreten. Das $w$ steht hier für "weight", also Gewicht.

````{anywidget} ../widgets/line-parameters.mjs
:css: ../widgets/interactive-plots.css
{
  "m": 1,
  "b": 0
}
````

:::

Versuche bei den folgenden Beispielen jeweils, die passende Geradengleichung abzulesen.

**Beispiel 1**

````{code-cell} python
:tags: remove-input

x_plot = np.linspace(-4, 4, 200)
y_plot = 2 * x_plot + 1

plt.figure(figsize=(5, 5))
plt.plot(x_plot, y_plot, color="#c84c22", linewidth=3)
plt.xlim(-4, 4)
plt.ylim(-8, 10)
plt.axhline(0, color="#49423a", linewidth=1.5)
plt.axvline(0, color="#49423a", linewidth=1.5)
plt.xticks(range(-4, 5))
plt.yticks(range(-8, 11))
plt.grid(True, alpha=0.3)
plt.xlabel("x")
plt.ylabel("y")
plt.title("Welche Geradengleichung passt zu diesem Plot?")
plt.gca().set_aspect("equal", adjustable="box")
plt.show()
````

````{code-cell} python
:tags: remove-input

display_quiz([
  {
    "question": "Welche Geradengleichung gehört zu Beispiel 1?",
    "type": "multiple_choice",
    "answers": [
      {"answer": "y = 2x + 1", "correct": True, "feedback": "Richtig. Die Gerade steigt pro Schritt in x um 2 und schneidet die y-Achse bei 1."},
      {"answer": "y = x + 2", "correct": False, "feedback": "Nicht richtig. Der y-Achsenabschnitt wäre dann 2 und die Steigung nur 1."},
      {"answer": "y = 2x - 1", "correct": False, "feedback": "Nicht richtig. Die Steigung 2 passt, aber der y-Achsenabschnitt liegt hier bei +1, nicht bei -1."}
    ]
  }
], colors="fdsp")
````

**Beispiel 2**

````{code-cell} python
:tags: remove-input

x_plot = np.linspace(-4, 4, 200)
y_plot = -x_plot + 3

plt.figure(figsize=(5, 5))
plt.plot(x_plot, y_plot, color="#c84c22", linewidth=3)
plt.xlim(-4, 4)
plt.ylim(-3, 8)
plt.axhline(0, color="#49423a", linewidth=1.5)
plt.axvline(0, color="#49423a", linewidth=1.5)
plt.xticks(range(-4, 5))
plt.yticks(range(-2, 9))
plt.grid(True, alpha=0.3)
plt.xlabel("x")
plt.ylabel("y")
plt.title("Welche Geradengleichung passt zu diesem Plot?")
plt.gca().set_aspect("equal", adjustable="box")
plt.show()
````

````{code-cell} python
:tags: remove-input

display_quiz([
  {
    "question": "Welche Geradengleichung gehört zu Beispiel 2?",
    "type": "multiple_choice",
    "answers": [
      {"answer": "y = x + 3", "correct": False, "feedback": "Nicht richtig. Die Gerade fällt nach rechts, also ist die Steigung negativ."},
      {"answer": "y = -x + 3", "correct": True, "feedback": "Richtig. Die Gerade hat die Steigung -1 und schneidet die y-Achse bei 3."},
      {"answer": "y = -x - 3", "correct": False, "feedback": "Nicht richtig. Die Steigung passt, aber der y-Achsenabschnitt ist im Plot +3."}
    ]
  }
], colors="fdsp")
````

**Beispiel 3**

````{code-cell} python
:tags: remove-input

x_plot = np.linspace(-4, 4, 200)
y_plot = 0.5 * x_plot - 2

plt.figure(figsize=(5, 5))
plt.plot(x_plot, y_plot, color="#c84c22", linewidth=3)
plt.xlim(-4, 4)
plt.ylim(-5, 2)
plt.axhline(0, color="#49423a", linewidth=1.5)
plt.axvline(0, color="#49423a", linewidth=1.5)
plt.xticks(range(-4, 5))
plt.yticks(range(-5, 3))
plt.grid(True, alpha=0.3)
plt.xlabel("x")
plt.ylabel("y")
plt.title("Welche Geradengleichung passt zu diesem Plot?")
plt.gca().set_aspect("equal", adjustable="box")
plt.show()
````

````{code-cell} python
:tags: remove-input

display_quiz([
  {
    "question": "Welche Geradengleichung gehört zu Beispiel 3?",
    "type": "multiple_choice",
    "answers": [
      {"answer": "y = 0.5x - 2", "correct": True, "feedback": "Richtig. Die Gerade steigt nur flach an und schneidet die y-Achse bei -2."},
      {"answer": "y = 2x - 0.5", "correct": False, "feedback": "Nicht richtig. Diese Gerade wäre deutlich steiler und hätte einen anderen Achsenabschnitt."},
      {"answer": "y = 0.5x + 2", "correct": False, "feedback": "Nicht richtig. Die Steigung passt, aber die Gerade schneidet die y-Achse im Plot bei -2 und nicht bei +2."}
    ]
  }
], colors="fdsp")
````

Zum Schluss schauen wir auf die echten Datenpunkte:

````{code-cell} python
:tags: remove-input

plt.figure(figsize=(7, 5))
plt.scatter(wohnflaeche, miete, color="#1d4f73")
plt.xlabel("Wohnfläche in m2")
plt.ylabel("Miete in EUR")
plt.title("Datenpunkte für die lineare Regression")
plt.grid(True, alpha=0.3)
plt.show()
````

Jeder Punkt repräsentiert eine Wohnung. 
Gesucht ist nun eine Gerade, die den Zusammenhang zwischen Wohnfläche und Miete möglichst sinnvoll beschreibt.
Wir sehen schon grob, dass die Punkte einen linearen Zusammenhang zeigen, also dass die Punkte im groben einer Geraden folgen. Das ist ein gutes Zeichen dafür, dass die lineare Regression hier eine sinnvolle Wahl sein könnte.

Weiter geht es mit [Fehlermaßen und MSE](03-1d-fehlermasse-und-mse.md).