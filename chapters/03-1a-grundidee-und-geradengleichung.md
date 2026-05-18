---
title: "3.1.1 Grundidee und Geradengleichung"
kernelspec:
  name: python3
  display_name: Python 3
---

# 3.1.1 Grundidee und Geradengleichung

````{code-cell} python
:tags: remove-input

import numpy as np
import matplotlib.pyplot as plt
from jupyterquiz import display_quiz

wohnflaeche = np.array([38, 42, 47, 51, 58, 63, 67, 72, 78, 85, 92, 105])
zimmer = np.array([1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5])
baujahr = np.array([1968, 1985, 1992, 1978, 2001, 1998, 2010, 1988, 2015, 2008, 2019, 2012])
entfernung = np.array([8.5, 6.8, 7.2, 5.4, 4.8, 6.1, 3.9, 5.2, 3.1, 4.0, 2.3, 1.8])
etage = np.array([1, 3, 2, 4, 1, 2, 5, 3, 4, 2, 6, 5])
balkon = np.array([0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1])
energieklasse = np.array(["D", "C", "D", "C", "B", "C", "A", "B", "A", "B", "A", "A"])
miete = np.array([590, 660, 710, 760, 870, 910, 980, 1040, 1180, 1290, 1410, 1620])
````

## Problem: Berechnung der Miete

Stell dir vor du hast ein Wohnungsangebot gegeben mit folgenden Daten:

- Wohnfläche: 75 m2
- Zimmer: 3
- Baujahr: 2005
- Entfernung zum Zentrum: 4 km
- Etage: 3
- Balkon: Ja
- Energieklasse: B
- Miete: 1200 EUR

Du willst wissen, ob das ein guter Preis ist.

Stell dir vor du hast Zugriff auf einen Datensatz mit Informationen zu vielen Wohnungen, inklusive ihrer Miete.

| Wohnfläche in m2 | Zimmer | Baujahr | Entfernung zum Zentrum in km | Etage | Balkon | Energieklasse | Miete in EUR |
| ---: | ---: | ---: | ---: | ---: | ---: | :---: | ---: |
| 38 | 1 | 1968 | 8.5 | 1 | 0 | D | 590 |
| 42 | 2 | 1985 | 6.8 | 3 | 1 | C | 660 |
| 47 | 2 | 1992 | 7.2 | 2 | 0 | D | 710 |
| 51 | 2 | 1978 | 5.4 | 4 | 1 | C | 760 |
| 58 | 2 | 2001 | 4.8 | 1 | 1 | B | 870 |
| 63 | 3 | 1998 | 6.1 | 2 | 0 | C | 910 |
| 67 | 3 | 2010 | 3.9 | 5 | 1 | A | 980 |
| 72 | 3 | 1988 | 5.2 | 3 | 1 | B | 1040 |
| 78 | 3 | 2015 | 3.1 | 4 | 1 | A | 1180 |
| 85 | 4 | 2008 | 4.0 | 2 | 0 | B | 1290 |
| 92 | 4 | 2019 | 2.3 | 6 | 1 | A | 1410 |
| 105 | 5 | 2012 | 1.8 | 5 | 1 | A | 1620 |

Der Ansatz ist jetzt folgender:
Kann ich aus den Daten lernen, wie die Miete von den anderen Merkmalen abhängt? Wenn ja, dann könnte ich das gelernte Modell verwenden, um die Miete für die neue Wohnung zu schätzen.

Das ist also ein klassisches Problem des Supervised Learning in Form einer Regression: Es gibt einen numerischen Zielwert oder ein Label (die Miete), den ich vorhersagen will, und es gibt Eingabedaten (Features), die ich verwenden kann, um die Vorhersage zu machen. Dabei ist der Zielwert keine Klasse, sondern ein kontinuierlicher Wert.

## Mathematische Formulierung des Regressionsproblems

Mathematisch formuliert wollen wir eine Funktion $f$ finden, die aus den Eingabedaten $x$ eine Vorhersage $\hat{y}$ macht:

```{math}
f(x)= \hat{y} \approx y
```

Dabei gilt:

- $x$: Eingabe oder Merkmalsvektor
- $y$: beobachteter Zielwert
- $\hat{y}$: vorhergesagter Zielwert
- $f$: die gesuchte Funktion

Für unser Beispiel bedeutet das: Aus den Wohnungsdaten wollen wir eine Funktion $f$ lernen, die, wenn wir alle Eigenschaften bis auf die Miete eingeben, eine Vorhersage $\hat{y}$ für die Miete macht, die möglichst nah am beobachteten Wert $y$ liegt.

Die lineare Regression ist ein spezielles Modell für die Funktion $f$. Sie nimmt an, dass $f$ eine lineare Funktion der Eingabedaten ist.

:::{admonition} Mini-Quiz: Welche Aussagen sind wahr?

````{code-cell} python
:tags: remove-input

display_quiz([
  {
    "question": "Welche der folgenden Aussagen zur linearen Regression im Wohnungsbeispiel sind wahr? Wähle alle zutreffenden Aussagen aus.",
    "type": "many_choice",
    "answers": [
      {
        "answer": "Es handelt sich um ein Regressionsproblem, weil wir ein klar definiertes Label haben.",
        "correct": False,
        "feedback": "Nicht ganz. Ein vorhandenes Label spricht zunächst nur für Supervised Learning. Für Regression ist entscheidend, dass ein numerischer Wert wie die Miete vorhergesagt wird."
      },
      {
        "answer": "Lineare Regression soll bei Eingabe der Miete herausbekommen, ob eine Wohnung zu teuer oder zu billig ist.",
        "correct": False,
        "feedback": "Nicht richtig. Die lineare Regression soll hier nicht eine Klasse wie 'zu teuer' oder 'zu billig' ausgeben, sondern die Miete selbst schätzen."
      },
      {
        "answer": "Lineare Regression soll die Miete schätzen, wenn ich die anderen Merkmale einsetze.",
        "correct": True,
        "feedback": "Richtig. Die Eingabemerkmale wie Wohnfläche, Zimmerzahl oder Baujahr werden verwendet, um die Miete vorherzusagen."
      },
      {
        "answer": "Lineare Regression eignet sich besonders dann, wenn wir von einem linearen Zusammenhang ausgehen.",
        "correct": True,
        "feedback": "Richtig. Das Modell ist besonders passend, wenn der Zusammenhang zwischen Eingabe und Zielwert näherungsweise linear ist."
      }
    ]
  }
], colors="fdsp")
````

:::

## Lineare Regression in einer Dimension

Bevor wir die allgemeine Form der linearen Regression mit mehreren Merkmalen betrachten, konzentrieren wir uns zunächst auf die einfachste Variante: die lineare Regression in einer Dimension.

In diesem Fall haben wir nur ein Merkmal, zum Beispiel die Wohnfläche $x$, und wollen die Miete $y$ vorhersagen.

Wir gehen außerdem davon aus, dass wir insgesamt $N$ Datenpunkte haben, also $N$ Wohnungen mit bekannten Wohnflächen und Mieten. Diese Datenpunkte können wir als Paare $(x_i, y_i)$ darstellen, wobei $i$ von $1$ bis $N$ läuft und $x_i,y_i\in\mathbb{R}$ sind.

:::{admonition} Einschub: Die Geradengleichung in der Ebene

Eine Gerade in der Ebene wird durch

```{math}
y = mx + b
```

beschrieben, wobei

- $m$ die Steigung ist.
- $b$ der Achsenabschnitt ist.

Die Steigung $m$ gibt an, wie stark sich $y$ ändert, wenn sich $x$ um eine Einheit ändert. Der Achsenabschnitt $b$ gibt an, welchen Wert $y$ annimmt, wenn $x=0$ ist.

Wir werden in diesem Kurs häufig die Notation $m=w_1$ und $b=w_0$ verwenden, um die Parameter der linearen Funktion zu bezeichnen.

Im folgenden interaktiven Widget kannst du die Parameter $m$ und $b$ anpassen und beobachten, wie sich die Gerade ändert.

````{anywidget} ../widgets/line-parameters.mjs
:css: ../widgets/interactive-plots.css
{
  "m": 1,
  "b": 0
}
````

Versuche nun bei den folgenden drei Beispielen jeweils die passende Geradengleichung abzulesen.

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

:::

Zurück zur linearen Regression: Jetzt tragen wir die Informationen zur Wohnfläche und Miete in ein Koordinatensystem ein.

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

Jeder Punkt repräsentiert eine Wohnung. Gesucht ist nun eine Gerade, die den Zusammenhang zwischen Wohnfläche und Miete möglichst sinnvoll beschreibt.

Weiter geht es mit [Fehlermaße und MSE](03-1b-fehlermasse-und-mse.md).