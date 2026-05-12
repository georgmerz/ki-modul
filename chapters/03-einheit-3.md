---
title: "Supervised Learning: Lineare und Logistische Regression"
kernelspec:
  name: python3
  display_name: Python 3
---

# Supervised Learning: Lineare und Logistische Regression

In diesem Kapitel geht es zunaechst nur um lineare Regression. Die logistische Regression folgt danach als eigener naechster Schritt.

## Lernziele

Nach diesem Kapitel kannst du:

1. ein Regressionsproblem als Suche nach einer Funktion beschreiben,
2. lineare Regression in einer Dimension erklaeren,
3. Steigung und Achsenabschnitt sinnvoll interpretieren,
4. den MSE als Kriterium fuer eine "gute" Gerade einsetzen,
5. lineare Regression von einer Dimension auf mehrere Merkmale erweitern,
6. die Grundidee der rechnerischen Loesung einordnen.

````{code-cell} python
:tags: remove-input

import numpy as np
import matplotlib.pyplot as plt

wohnflaeche = np.array([38, 42, 47, 51, 58, 63, 67, 72, 78, 85, 92, 105])
zimmer = np.array([1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5])
baujahr = np.array([1968, 1985, 1992, 1978, 2001, 1998, 2010, 1988, 2015, 2008, 2019, 2012])
entfernung = np.array([8.5, 6.8, 7.2, 5.4, 4.8, 6.1, 3.9, 5.2, 3.1, 4.0, 2.3, 1.8])
etage = np.array([1, 3, 2, 4, 1, 2, 5, 3, 4, 2, 6, 5])
balkon = np.array([0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1])
energieklasse = np.array(["D", "C", "D", "C", "B", "C", "A", "B", "A", "B", "A", "A"])
miete = np.array([590, 660, 710, 760, 870, 910, 980, 1040, 1180, 1290, 1410, 1620])

def fit_line_1d(x, y):
    x_mean = np.mean(x)
    y_mean = np.mean(y)
    m = np.sum((x - x_mean) * (y - y_mean)) / np.sum((x - x_mean) ** 2)
    b = y_mean - m * x_mean
    return m, b

def mean_squared_error_np(y_true, y_pred):
    return np.mean((y_true - y_pred) ** 2)
````

## Ein Beispiel mit vielen Merkmalen

Ein realer Datensatz enthaelt oft mehr als nur ein einziges Merkmal. Bei Wohnungen koennen zum Beispiel Wohnflaeche, Zimmerzahl, Baujahr, Lage oder Balkon eine Rolle spielen.

| Wohnflaeche in m2 | Zimmer | Baujahr | Entfernung zum Zentrum in km | Etage | Balkon | Energieklasse | Miete in EUR |
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

In diesem Kapitel verwenden wir fuer den Einstieg trotzdem nur ein Merkmal: die Wohnflaeche. So laesst sich die Grundidee der linearen Regression klar und anschaulich entwickeln.

## Vom Datensatz zur Funktion

Allgemein wollen wir aus Eingaben eine Vorhersage fuer einen Zielwert erzeugen. Mathematisch schreiben wir das als

```{math}
\hat{y} = f(x)
```

Dabei gilt:

- $x$: Eingabe oder Merkmalsvektor,
- $y$: beobachteter Zielwert,
- $\hat{y}$: vorhergesagter Zielwert,
- $f$: die gesuchte Funktion.

Fuer unser Beispiel bedeutet das: Aus Eigenschaften einer Wohnung soll eine geschaetzte Miete berechnet werden.

Fuer den Einstieg machen wir die Aufgabe absichtlich einfacher. Wir betrachten nur die Wohnflaeche und verlangen, dass die Funktion linear ist. Damit wird aus $f$ eine Gerade.

```{math}
\hat{y} = m x + b
```

## Lineare Regression in einer Dimension

Wir konzentrieren uns jetzt auf eine einzige Eingabevariable:

```{math}
x = \text{Wohnflaeche}
```

und auf einen Zielwert:

```{math}
y = \text{Miete}
```

### Einschub: Die Geradengleichung

Eine Gerade in der Ebene wird durch

```{math}
y = mx + b
```

beschrieben.

- $m$ ist die Steigung.
- $b$ ist der Achsenabschnitt.

Wenn $m$ groesser wird, steigt die Gerade steiler an. Wenn $b$ groesser wird, verschiebt sich die Gerade nach oben.

````{anywidget} ../widgets/line-parameters.mjs
:css: ../widgets/interactive-plots.css
{
  "m": 1,
  "b": 0
}
````

Zurueck zur linearen Regression: Jetzt tragen wir die beobachteten Datenpunkte in ein Koordinatensystem ein.

````{code-cell} python
:tags: remove-input

plt.figure(figsize=(7, 5))
plt.scatter(wohnflaeche, miete, color="#1d4f73")
plt.xlabel("Wohnflaeche in m2")
plt.ylabel("Miete in EUR")
plt.title("Datenpunkte fuer die lineare Regression")
plt.grid(True, alpha=0.3)
plt.show()
````

Jeder Punkt repraesentiert eine Wohnung. Gesucht ist nun eine Gerade, die den Zusammenhang zwischen Wohnflaeche und Miete moeglichst sinnvoll beschreibt.

## Wann passt eine Gerade "gut"?

Eine Gerade passt dann "gut", wenn ihre Vorhersagen nahe an den beobachteten Punkten liegen. Fuer einen einzelnen Datenpunkt $(x_i, y_i)$ berechnet das Modell zunaechst die Vorhersage

```{math}
\hat{y}_i = m x_i + b
```

Der Fehler ist dann

```{math}
e_i = y_i - \hat{y}_i
```

Dieser Abstand wird Residuum genannt. Im Plot sieht man die Residuen als vertikale Strecken zwischen den Datenpunkten und der Beispielgeraden.

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

plt.xlabel("Wohnflaeche in m2")
plt.ylabel("Miete in EUR")
plt.title("Residuen zur Beispielgeraden")
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
````

Eine einzelne Gerade ist also nicht deshalb "gut", weil sie schoen aussieht, sondern weil die Abstaende zu den Datenpunkten insgesamt klein sind.

## Der MSE

Wenn man alle Fehler einfach addiert, koennen sich positive und negative Abweichungen gegenseitig aufheben. Deshalb arbeitet man mit quadrierten Fehlern. Das fuehrt zum mittleren quadratischen Fehler:

```{math}
  ext{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2
```

Fuer die lineare Regression in einer Dimension ergibt sich daraus

```{math}
  ext{MSE}(m,b) = \frac{1}{n}\sum_{i=1}^{n}(y_i - (m x_i + b))^2
```

Je kleiner der MSE ist, desto "besser" passt die Gerade zu den Daten.

## Interaktives Beispiel: Die Loesung von Hand finden

Bevor wir eine Formel einsetzen, lohnt sich ein Blick auf die Aufgabe mit den Augen. Versuche im folgenden Widget, eine moeglichst "gute" Gerade selbst einzustellen.

````{anywidget} ../widgets/regression-playground.mjs
:css: ../widgets/interactive-plots.css
{
  "points": [[38, 590], [42, 660], [47, 710], [51, 760], [58, 870], [63, 910], [67, 980], [72, 1040], [78, 1180], [85, 1290], [92, 1410], [105, 1620]],
  "m": 11,
  "b": 180
}
````

Arbeite dabei in drei Schritten:

1. Stelle zuerst nur nach Augenmass eine "gute" Gerade ein.
2. Beobachte danach, wie sich der MSE veraendert.
3. Vergleiche deine manuelle Loesung mit einer deutlich zu flachen und einer deutlich zu steilen Gerade.

## Formel zum Finden der besten Gerade

Nach dem Ausprobieren kommt der rechnerische Teil. In der einfachen linearen Regression lassen sich die optimale Steigung und der optimale Achsenabschnitt direkt berechnen:

```{math}
m = \frac{\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n}(x_i - \bar{x})^2}
```

```{math}
b = \bar{y} - m\bar{x}
```

Damit erhalten wir die Gerade, deren MSE minimal ist.

````{code-cell} python
:tags: remove-input

m_opt, b_opt = fit_line_1d(wohnflaeche, miete)
y_opt = m_opt * wohnflaeche + b_opt
mse_opt = mean_squared_error_np(miete, y_opt)

print(f"Steigung m: {m_opt:.2f}")
print(f"Achsenabschnitt b: {b_opt:.2f}")
print(f"MSE: {mse_opt:.2f}")
````

````{code-cell} python
:tags: remove-input

x_line = np.linspace(35, 108, 200)
y_line = m_opt * x_line + b_opt

plt.figure(figsize=(7, 5))
plt.scatter(wohnflaeche, miete, label="Daten", color="#1d4f73")
plt.plot(x_line, y_line, label="Optimale Regressionsgerade", color="#c84c22")
plt.xlabel("Wohnflaeche in m2")
plt.ylabel("Miete in EUR")
plt.title("Berechnete lineare Regression")
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
````

## Interpretation

Angenommen, das Modell hat die Form

```{math}
\hat{y} = 14.8x + 18
```

Dann bedeutet das:

- Pro zusaetzlichem Quadratmeter steigt die geschaetzte Miete im Mittel um etwa $14.8$ EUR.
- Fuer $75$ m2 ergibt sich die Vorhersage $14.8 \cdot 75 + 18 = 1128$ EUR.
- Der Achsenabschnitt ist mathematisch Teil der Geraden, auch wenn eine Wohnung mit $0$ m2 inhaltlich kein sinnvoller Fall ist.

## Mehrere Merkmale

In realen Anwendungen reicht eine einzige Variable oft nicht aus. Dann wird aus der linearen Regression in einer Dimension ein Modell mit mehreren Merkmalen.

### Einschub: Allgemeine Geradengleichung

Mit mehreren Merkmalen schreiben wir allgemeiner

```{math}
\hat{y} = w_1x_1 + w_2x_2 + \dots + w_dx_d + b
```

oder kompakt

```{math}
\hat{y} = \mathbf{w}^T\mathbf{x} + b
```

Die Koeffizienten $w_1, \dots, w_d$ geben an, wie stark sich die Vorhersage aendert, wenn sich das zugehoerige Merkmal aendert und alle anderen gleich bleiben.

Ein moegliches Modell fuer Wohnungen waere zum Beispiel

```{math}
\hat{y} = 11x_1 - 32x_2 + 95x_3 + 240
```

mit

- $x_1$: Wohnflaeche,
- $x_2$: Entfernung zum Zentrum,
- $x_3$: Balkon mit $1$ fuer ja und $0$ fuer nein.

## MSE allgemein formuliert

Auch mit mehreren Merkmalen bleibt die Grundidee dieselbe: Gesucht sind die Modellparameter, die den mittleren quadratischen Fehler minimieren.

```{math}
	ext{MSE}(\boldsymbol{\theta}) = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2
```

Mit Vektor- und Matrixschreibweise kann man das auch so ausdruecken:

```{math}
	ext{MSE}(\boldsymbol{\theta}) = \frac{1}{n}\lVert \mathbf{y} - X\boldsymbol{\theta} \rVert^2
```

Damit ist das Problem allgemein formuliert: Finde die Parameter $\boldsymbol{\theta}$, fuer die dieser Ausdruck minimal wird.

## Ausblick: Loesung des Systems

In einer Dimension konnten wir die Parameter mit einer expliziten Formel bestimmen. Bei mehreren Merkmalen wird daraus ein lineares Gleichungssystem beziehungsweise ein Optimierungsproblem.

Die rechnerische Loesung laesst sich dann zum Beispiel ueber

- die Normalgleichung,
- numerische Optimierung,
- oder spaeter ueber Bibliotheken wie `scikit-learn`

finden.

Der Code zur linearen Regression wird im begleitenden Notebook besprochen: [Notebook zur linearen Regression](03-lineare-regression-code.ipynb).

Danach folgt als naechstes Thema die logistische Regression.
