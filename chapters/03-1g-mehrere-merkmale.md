---
title: "3.1.7 Mehrere Merkmale"
kernelspec:
  name: python3
  display_name: Python 3
---

# 3.1.7 Mehrere Merkmale

````{code-cell} python
:tags: remove-input

from jupyterquiz import display_quiz
````


Bis jetzt haben wir die lineare Regression nur mit einem Merkmal betrachtet. Das ist in vielen Fällen nicht ausreichend, da die Zielgröße von mehreren Faktoren abhängen kann. So zum Beispiel in unserem Beispiel mit der Miete: Natürlich hängt die Miete nicht nur von der Wohnfläche ab, sondern auch von anderen Faktoren wie der Lage, der Ausstattung oder dem Baujahr der Wohnung.


Wir wollen nun die Ideen der linearen Regression auf den Fall mit mehreren Merkmalen erweitern.


## Notation
Hierfür müssen wir uns zunächst über die Notation klar werden. Bisher haben wir die Wohnfläche als $x\in \mathbb{R}$ und die Miete als $y\in \mathbb{R}$ bezeichnet. Wenn wir nun mehrere Merkmale haben, dann sind die Features nicht mehr einzelne Werte, sondern Vektoren. Wir bezeichnen die Anzahl der Features mit $n$ (die Anzahl der Daten war bisher $N$). Dann haben wir für jedes Datenbeispiel einen Feature-Vektor $\mathbf{x} \in \mathbb{R}^n$ und eine Zielgröße $y \in \mathbb{R}$.

Wenn wir direkt den $i$-ten Datenpunkt betrachten, dann schreiben wir den Feature-Vektor als $\mathbf{x}^{(i)}=(x_1^{(i)}, x_2^{(i)}, \dots, x_n^{(i)})$ und die zugehörige Zielgröße als $y^{(i)}$. Das bedeutet, dass $x_j^{(i)}$ das $j$-te Merkmal des $i$-ten Datenpunkts ist.

Für unser Mietbeispiel verwenden wir jetzt alle Merkmale aus dem Datensatz:

- $x_1$: Wohnfläche
- $x_2$: Zimmer
- $x_3$: Baujahr
- $x_4$: Entfernung zum Zentrum
- $x_5$: Etage
- $x_6$: Balkon
- $x_7$: Energieklasse

Die Zielgröße ist jeweils die Miete $y^{(i)}$. Das Merkmal Energieklasse ist hier noch als Kategorie notiert; für ein numerisches Modell würde man es später passend codieren.

| $i$ | $x_1^{(i)}$ Wohnfläche | $x_2^{(i)}$ Zimmer | $x_3^{(i)}$ Baujahr | $x_4^{(i)}$ Entfernung | $x_5^{(i)}$ Etage | $x_6^{(i)}$ Balkon | $x_7^{(i)}$ Energieklasse | $y^{(i)}$ Miete |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $1$ | $38$ | $1$ | $1968$ | $8.5$ | $1$ | $0$ | $D$ | $590$ |
| $2$ | $42$ | $2$ | $1985$ | $6.8$ | $3$ | $1$ | $C$ | $660$ |
| $3$ | $47$ | $2$ | $1992$ | $7.2$ | $2$ | $0$ | $D$ | $710$ |
| $4$ | $51$ | $2$ | $1978$ | $5.4$ | $4$ | $1$ | $C$ | $760$ |
| $5$ | $58$ | $2$ | $2001$ | $4.8$ | $1$ | $1$ | $B$ | $870$ |
| $6$ | $63$ | $3$ | $1998$ | $6.1$ | $2$ | $0$ | $C$ | $910$ |
| $7$ | $67$ | $3$ | $2010$ | $3.9$ | $5$ | $1$ | $A$ | $980$ |
| $8$ | $72$ | $3$ | $1988$ | $5.2$ | $3$ | $1$ | $B$ | $1040$ |
| $9$ | $78$ | $3$ | $2015$ | $3.1$ | $4$ | $1$ | $A$ | $1180$ |
| $10$ | $85$ | $4$ | $2008$ | $4.0$ | $2$ | $0$ | $B$ | $1290$ |
| $11$ | $92$ | $4$ | $2019$ | $2.3$ | $6$ | $1$ | $A$ | $1410$ |
| $12$ | $105$ | $5$ | $2012$ | $1.8$ | $5$ | $1$ | $A$ | $1620$ |

:::{admonition} Mini-Quiz zur Tabelle

````{code-cell} python
:tags: remove-input

display_quiz([
	{
		"question": "Welcher Wert ist in der Tabelle $x_4^{(3)}$?",
		"type": "multiple_choice",
		"answers": [
			{
				"answer": "7.2",
				"correct": True,
				"feedback": "Richtig. Beim dritten Datenpunkt ist das vierte Merkmal, also die Entfernung zum Zentrum, gleich 7.2 km."
			},
			{
				"answer": "6.8",
				"correct": False,
				"feedback": "Nicht richtig. Das ist $x_4^{(2)}$."
			},
			{
				"answer": "2",
				"correct": False,
				"feedback": "Nicht richtig. Das ist $x_2^{(3)}$, also die Zimmerzahl des dritten Datenpunkts."
			}
		]
	},
	{
		"question": "Welcher Wert ist in der Tabelle $x_7^{(2)}$?",
		"type": "multiple_choice",
		"answers": [
			{
				"answer": "C",
				"correct": True,
				"feedback": "Richtig. Beim zweiten Datenpunkt ist die Energieklasse C eingetragen."
			},
			{
				"answer": "B",
				"correct": False,
				"feedback": "Nicht richtig. B kommt in der Tabelle vor, aber nicht bei $x_7^{(2)}$."
			},
			{
				"answer": "1",
				"correct": False,
				"feedback": "Nicht richtig. Das ist hier ein numerischer Wert, aber $x_7$ steht fuer die Energieklasse."
			}
		]
	},
	{
		"question": "Welcher Wert ist nach der Tabelle gleich $y^{(10)}$?",
		"type": "multiple_choice",
		"answers": [
			{
				"answer": "1290",
				"correct": True,
				"feedback": "Richtig. $y^{(10)}$ ist die Miete des zehnten Datenpunkts."
			},
			{
				"answer": "85",
				"correct": False,
				"feedback": "Nicht richtig. Das ist $x_1^{(10)}$, also die Wohnflaeche des zehnten Datenpunkts."
			},
			{
				"answer": "4.0",
				"correct": False,
				"feedback": "Nicht richtig. Das ist $x_4^{(10)}$, also die Entfernung des zehnten Datenpunkts."
			}
		]
	},
	{
		"question": "Wie gross sind $N$ und $n$ in der Tabelle?",
		"type": "multiple_choice",
		"answers": [
			{
				"answer": "$N=12$ und $n=7$",
				"correct": True,
				"feedback": "Richtig. Es gibt 12 Datenpunkte und 7 Merkmale pro Datenpunkt."
			},
			{
				"answer": "$N=7$ und $n=12$",
				"correct": False,
				"feedback": "Nicht richtig. Das vertauscht Datenpunkte und Merkmale."
			},
			{
				"answer": "$N=12$ und $n=8$",
				"correct": False,
				"feedback": "Nicht richtig. Die Spalte mit $i$ ist nur die Nummer des Datenpunkts und kein zusaetzliches Merkmal."
			}
		]
	}
], colors="fdsp")
````

:::

Dabei verwenden wir für die Zielgröße die Notation $y^{(i)}$. Ein Index wie $y_j$ würde hier nicht passen, weil $y$ in diesem Beispiel kein Vektor aus mehreren Merkmalen ist, sondern ein einzelner Zielwert pro Datenpunkt.


## Allgemeine lineare Gleichung
Die lineare Regression in einer Dimension hat die Form $\hat{y} = w_1x + w_0$. Wenn wir nun mehrere Merkmale haben, dann erweitern wir diese Gleichung entsprechend. Die allgemeine Form der linearen Gleichung mit mehreren Merkmalen ist:
:::{admonition} Einschub: Allgemeine lineare Gleichung

```{math}
\hat{y} = w_1x_1 + w_2x_2 + \dots + w_nx_n + w_0
```

oder kompakt

```{math}
\hat{y} = \mathbf{w}^T\mathbf{x} + w_0
```
mit $\mathbf{w} = \begin{pmatrix} w_1 \\ w_2 \\ \vdots \\ w_n \end{pmatrix}$ und $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$.
:::

Wir erinnern uns wieder daran, dass wir eine Funktion suchen, die die Zielgröße $y$ möglichst gut vorhersagt. 

Wir suchen also die Parameter $w_0, w_1, \dots, w_n$. So dass die zugehörige Funktion
```{math}
f_{\mathbf{w}, w_0}(\mathbf{x}^{(i)}) = \mathbf{w}^T\mathbf{x}^{(i)} + w_0 \approx y^{(i)}
``` 



Ziel der linearen Regression in mehereren Dimensionen ist es nun Parameter $w_0, w_1, \dots, w_n$ zu finden


## MSE in mehreren Dimensionen


Auch bei mehreren Merkmalen bleibt die Grundidee gleich: Gesucht sind die Modellparameter, die den mittleren quadratischen Fehler minimieren.

```{math}
\text{MSE}(\mathbf{w}, w_0) = \frac{1}{N}\sum_{i=1}^{N}(y^{(i)} - f_{\mathbf{w}, w_0}(\mathbf{x}^{(i)}))^2
```

In Vektor- und Matrixschreibweise lautet dieselbe Idee:

```{math}
	ext{MSE}(\mathbf{w}, w_0) = \frac{1}{N}\lVert \mathbf{y} - (\mathbf{X}\mathbf{w} + w_0\mathbf{1}) \rVert_2^2
```

Da das Label wie im eindimensionalen Fall nur ein Skalar ist ändert sich an der Definition des MSE nichts. Es ist immer noch die durchschnittliche quadratische Abweichung zwischen den vorhergesagten Werten und den tatsächlichen Zielwerten.

Wir können nun das Optimierungsproblem formulieren: 
<!-- mach das wie im eindimensionalen Fall mit umgebung -->
:::{admonition} Optimierungsproblem der linearen Regression in mehreren Dimensionen

Gegeben sind die Trainingsdaten $\{(\mathbf{x}^{(i)}, y^{(i)})\}_{i=1}^N$ mit $\mathbf{x}^{(i)} \in \mathbb{R}^n$ und $y^{(i)} \in \mathbb{R}$.
Dann ist das Optimierungsproblem der linearen Regression in mehreren Dimensionen gegeben durch:
```{math}
\min_{\mathbf{w}, w_0} \text{MSE}(\mathbf{w}, w_0) = \min_{\mathbf{w}, w_0} \frac{1}{N}\sum_{i=1}^{N}(y^{(i)} - f_{\mathbf{w}, w_0}(\mathbf{x}^{(i)}))^2
```
## Lösung des Optimierungsproblems
Die gute Nachricht ist, dass es auch für die lineare Regression in mehreren Dimensionen eine exakte Lösung gibt.
Diese Lösung ist etwas komplizierter als im eindimensionalen Fall, aber sie lässt sich mit Hilfe von linearen Algebra und der Matrixschreibweise elegant ausdrücken. 

Hierfür müssen wir zunächst die sogenannte Designmatrix $\mathbf{X}$ und den Zielvektor $\mathbf{y}$ definieren. 

::{admonition} Designmatrix und Zielvektor
Gegeben seien die Trainingsdaten $\{(\mathbf{x}^{(i)}, y^{(i)})\}_{i=1}^N$ mit $\mathbf{x}^{(i)} \in \mathbb{R}^n$ und $y^{(i)} \in \mathbb{R}$.
Dann ist die Designmatrix $\mathbf{X} \in \mathbb{R}^{N \times n}$ definiert durch
```{math}
\mathbf{X} = \begin{pmatrix}
(x_1^{(1)}, x_2^{(1)}, \dots, x_n^{(1)}) \\
(x_1^{(2)}, x_2^{(2)}, \dots, x_n^{(2)}) \\
\vdots \\
(x_1^{(N)}, x_2^{(N)}, \dots, x_n^{(N)})
\end{pmatrix}
``` 

Der Zielvektor $\mathbf{y} \in \mathbb{R}^N$ ist definiert durch
```{math}
\mathbf{y} = \begin{pmatrix}
y^{(1)} \\
y^{(2)} \\
\vdots \\
y^{(N)}
\end{pmatrix}
```

:::{admonition} Mini-Aufgabe: Designmatrix aufstellen

Betrachte wieder die Tabelle oben. Fuer diese Aufgabe verwenden wir nur die numerischen Merkmale
$x_1$ bis $x_6$, also Wohnflaeche, Zimmer, Baujahr, Entfernung, Etage und Balkon.
Die Energieklasse $x_7$ lassen wir hier weg, weil sie zuerst noch geeignet codiert werden muesste.

Dann arbeiten wir fuer die Designmatrix zum Beispiel mit diesem kleinen Ausschnitt:

| $i$ | $x_1^{(i)}$ | $x_2^{(i)}$ | $x_3^{(i)}$ | $x_4^{(i)}$ | $x_5^{(i)}$ | $x_6^{(i)}$ | $y^{(i)}$ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $1$ | $38$ | $1$ | $1968$ | $8.5$ | $1$ | $0$ | $590$ |
| $2$ | $42$ | $2$ | $1985$ | $6.8$ | $3$ | $1$ | $660$ |
| $3$ | $47$ | $2$ | $1992$ | $7.2$ | $2$ | $0$ | $710$ |

````{code-cell} python
:tags: remove-input

display_quiz([
	{
		"question": "Welche Dimension hat die Designmatrix $\\mathbf{X}$ in dieser Aufgabe?",
		"type": "multiple_choice",
		"answers": [
			{
				"answer": "$12 \\times 6$",
				"correct": True,
				"feedback": "Richtig. Es gibt 12 Datenpunkte und in dieser Aufgabe 6 verwendete Merkmale."
			},
			{
				"answer": "$12 \\times 7$",
				"correct": False,
				"feedback": "Nicht hier. Diese Form waere nur passend, wenn auch die Energieklasse bereits numerisch codiert waere."
			},
			{
				"answer": "$6 \\times 12$",
				"correct": False,
				"feedback": "Nicht richtig. In der Designmatrix stehen die Datenpunkte zeilenweise und die Merkmale spaltenweise."
			}
		]
	},
	{
		"question": "Welche erste Zeile gehoert dann zur Designmatrix $\\mathbf{X}$?",
		"type": "multiple_choice",
		"answers": [
			{
				"answer": "$(38, 1, 1968, 8.5, 1, 0)$",
				"correct": True,
				"feedback": "Richtig. Das sind genau die sechs numerischen Merkmale des ersten Datenpunkts in der richtigen Reihenfolge."
			},
			{
				"answer": "$(38, 1, 1968, 8.5, 1, 0, D)$",
				"correct": False,
				"feedback": "Nicht richtig. In dieser Aufgabe lassen wir die Energieklasse bewusst weg."
			},
			{
				"answer": "$(590, 38, 1, 1968, 8.5, 1)$",
				"correct": False,
				"feedback": "Nicht richtig. Die Miete gehoert in den Zielvektor $\\mathbf{y}$ und nicht in die Designmatrix."
			}
		]
	},
	{
		"question": "Wie lautet der zugehoerige Zielvektor-Eintrag $y^{(1)}$ fuer die erste Zeile?",
		"type": "multiple_choice",
		"answers": [
			{
				"answer": "590",
				"correct": True,
				"feedback": "Richtig. Der erste Eintrag des Zielvektors ist die Miete des ersten Datenpunkts."
			},
			{
				"answer": "38",
				"correct": False,
				"feedback": "Nicht richtig. Das ist die Wohnflaeche des ersten Datenpunkts."
			},
			{
				"answer": "8.5",
				"correct": False,
				"feedback": "Nicht richtig. Das ist die Entfernung zum Zentrum des ersten Datenpunkts."
			}
		]
	}
], colors="fdsp")
````

:::


