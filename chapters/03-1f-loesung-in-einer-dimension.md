---
title: "3.1.6 Explizite Lösung in einer Dimension"
kernelspec:
  name: python3
  display_name: Python 3
---

# 3.1.6 Explizite Lösung in einer Dimension

````{code-cell} python
:tags: remove-input

import numpy as np
import matplotlib.pyplot as plt
from jupyterquiz import display_quiz

wohnflaeche = np.array([38, 42, 47, 51, 58, 63, 67, 72, 78, 85, 92, 105])
miete = np.array([590, 660, 710, 760, 870, 910, 980, 1040, 1180, 1290, 1410, 1620])
````

In der Regel lässt sich ein solches Optimierungsproblem nicht exakt durch eine einfache Formel lösen, sondern man verwendet numerische Verfahren. Mehr dazu folgt später bei der [logistischen Regression](03-2-logistische-regression.md).

Für lineare Regression gibt es jedoch eine explizite Formel für die optimalen Parameter. Insbesondere im eindimensionalen Fall können die optimalen Werte für $w_0$ und $w_1$ direkt berechnet werden.

:::{admonition} Satz: Lösung der linearen Regression in einer Dimension

```{math}
w_1 = \frac{\sum_{i=1}^{N}(x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{N}(x_i - \bar{x})^2}
```

```{math}
w_0 = \bar{y} - w_1\bar{x}
```

Dabei bezeichnen $\bar{x}$ und $\bar{y}$ die Mittelwerte der Eingaben und Zielwerte.

:::

:::{admonition} Kleine Rechenaufgabe

Betrachte die drei Datenpunkte $(1,3)$, $(2,5)$ und $(3,7)$.

Berechne zuerst die Mittelwerte $\bar{x}$ und $\bar{y}$, setze sie dann in die Formeln für $w_1$ und $w_0$ ein und bestimme am Ende die zugehoerige Gerade.

````{code-cell} python
:tags: remove-input

display_quiz([
  {
    "question": "Welcher Mittelwert ergibt sich fuer die x-Werte 1, 2 und 3?",
    "type": "string",
    "answers": [
      {"answer": "2", "correct": True, "feedback": "Richtig. Der Mittelwert ist (1 + 2 + 3) / 3 = 2.", "match_case": False, "fuzzy_threshold": 0.95},
      {"type": "default", "feedback": "Noch nicht richtig. Addiere die drei x-Werte und teile durch 3."}
    ]
  },
  {
    "question": "Welcher Mittelwert ergibt sich fuer die y-Werte 3, 5 und 7?",
    "type": "string",
    "answers": [
      {"answer": "5", "correct": True, "feedback": "Richtig. Der Mittelwert ist (3 + 5 + 7) / 3 = 5.", "match_case": False, "fuzzy_threshold": 0.95},
      {"type": "default", "feedback": "Noch nicht richtig. Addiere die drei y-Werte und teile durch 3."}
    ]
  },
  {
    "question": "Welchen Wert erhaelt $w_1$?",
    "type": "string",
    "answers": [
      {"answer": "2", "correct": True, "feedback": "Richtig. Die Steigung der Geraden ist $w_1 = 2$.", "match_case": False, "fuzzy_threshold": 0.95},
      {"answer": "w1=2", "correct": True, "feedback": "Richtig. Die Steigung der Geraden ist $w_1 = 2$.", "match_case": False, "fuzzy_threshold": 0.92},
      {"answer": "w_1 = 2", "correct": True, "feedback": "Richtig. Die Steigung der Geraden ist $w_1 = 2$.", "match_case": False, "fuzzy_threshold": 0.92},
      {"type": "default", "feedback": "Noch nicht richtig. Du solltest fuer die Steigung $w_1 = 2$ erhalten."}
    ]
  },
  {
    "question": "Welchen Wert erhaelt $w_0$?",
    "type": "string",
    "answers": [
      {"answer": "1", "correct": True, "feedback": "Richtig. Der Achsenabschnitt ist $w_0 = 1$.", "match_case": False, "fuzzy_threshold": 0.95},
      {"answer": "w0=1", "correct": True, "feedback": "Richtig. Der Achsenabschnitt ist $w_0 = 1$.", "match_case": False, "fuzzy_threshold": 0.92},
      {"answer": "w_0 = 1", "correct": True, "feedback": "Richtig. Der Achsenabschnitt ist $w_0 = 1$.", "match_case": False, "fuzzy_threshold": 0.92},
      {"type": "default", "feedback": "Noch nicht richtig. Setze deinen Wert fuer $w_1$ in $w_0 = \bar{y} - w_1\bar{x}$ ein. Du solltest $w_0 = 1$ erhalten."}
    ]
  }
], colors="fdsp")
````

:::


Mit Hilfe der Formeln können wir nun die optimalen Parameter für unser Wohnungsbeispiel berechnen. Das Ergebnis ist die Gerade, die den MSE minimiert und damit die beste lineare Anpassung an die Daten darstellt.

Bevor wir die Werte ausrechnen, kannst du das Prinzip selbst ausprobieren:

````{anywidget} ../widgets/click-regression.mjs
:css: ../widgets/interactive-plots.css
````

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
mse_opt = np.mean((miete - (m_opt * wohnflaeche + b_opt)) ** 2)
sqrt_mse_opt = np.sqrt(mse_opt)
intercept_sign = "-" if b_opt < 0 else "+"
intercept_abs = abs(b_opt)
slope_text = f"{m_opt:.2f}"
intercept_abs_text = f"{intercept_abs:.2f}"
line_equation_text = f"ŷ = {m_opt:.2f}x {intercept_sign} {intercept_abs:.2f}"
prediction_text = f"{m_opt:.2f} · 75 {intercept_sign} {intercept_abs:.2f} = {m_opt * 75 + b_opt:.2f}"
prediction_value_text = f"{m_opt * 75 + b_opt:.2f}"
mse_text = f"{mse_opt:.2f}"
sqrt_mse_text = f"{sqrt_mse_opt:.2f}"
y_mean_text = f"{y_mean:.2f}"
print(f"Steigung m: {m_opt:.2f}")
print(f"Achsenabschnitt b: {b_opt:.2f}")
print(f"Mittlerer quadratischer Fehler: {mse_opt:.2f}")
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

Damit ergibt sich die Regressionsgerade {eval}`line_equation_text`.

Das lässt sich direkt interpretieren:

- Pro zusätzlichem Quadratmeter steigt die geschätzte Miete im Mittel um etwa {eval}`slope_text` EUR.
- Für eine Wohnung mit $75$ m2 ergibt sich die Vorhersage {eval}`prediction_text` EUR.
- Der Achsenabschnitt ist mathematisch Teil der Geraden, auch wenn eine Wohnung mit $0$ m2 inhaltlich kein sinnvoller Fall ist.
- Der mittlere quadratische Fehler beträgt etwa {eval}`mse_text` EUR$^2$.


Um den quadratischen Fehler zu interpretieren müssen wir die Einheit beachten: Da die Fehler quadriert werden, hat der MSE die Einheit der Zielgröße zum Quadrat. In unserem Fall ist das EUR$^2$. Das bedeutet, dass ein MSE von 100 EUR$^2$ beispielsweise einem durchschnittlichen Fehler von 10 EUR entspricht, da $10^2 = 100$.

Da unser MSE etwa {eval}`mse_text` EUR$^2$ beträgt, können wir die durchschnittliche Abweichung der Vorhersagen von den tatsächlichen Werten abschätzen, indem wir die Quadratwurzel des MSE nehmen. Das ergibt etwa {eval}`sqrt_mse_text` EUR, was bedeutet, dass die Vorhersagen im Durchschnitt um etwa diesen Betrag von den tatsächlichen Mieten abweichen.

Im Verhätlnis zu den tatsächlichen Mieten, die im Mittel etwa {eval}`y_mean_text` EUR betragen, ist ein durchschnittlicher Fehler von etwa {eval}`sqrt_mse_text` EUR relativ gering, was darauf hindeutet, dass die lineare Regression eine gute Anpassung an die Daten bietet.

Weiter geht es mit [mehreren Merkmalen](03-1g-mehrere-merkmale.md).