---
title: "3.1.5 Formulierung als Optimierungsproblem"
---

# 3.1.5 Formulierung als Optimierungsproblem

Noch einmal in Worten: Wir wollen die Gerade $y = w_1 x + w_0$  finden, für die der MSE minimal wird. Das bedeutet, wir wollen die Parameter $w_1$ und $w_0$ so einstellen, dass die Summe der quadrierten Abweichungen zwischen den vorhergesagten Werten $w_1 x_i + w_0$ und den tatsächlichen Werten $y_i$ minimal wird.

Hierfür betrachten wir die Funktion, die für jede Wahl von $w_1$ und $w_0$ den MSE berechnet:
```{math}
\text{MSE}(w_1, w_0) = \frac{1}{N}\sum_{i=1}^{N}(y_i - (w_1x_i + w_0))^2
```

Mit dieser Funktion können wir das Optimierungsproblem formulieren: Gesucht sind genau die Parameter, für die dieser Ausdruck minimal wird. Je kleiner der MSE ist, desto besser passt die Gerade zu den Daten.

:::{admonition} Formulierung als Optimierungsproblem
Gegeben seien  $N$ Datenpunkte $(x_i, y_i)$ für $i=1, \dots, N$. Gesucht sind die Parameter $w_0$ und $w_1$, für die der MSE minimal wird::
```{math}
(w_1^*, w_0^*) = \arg\min_{w_1,w_0} MSE(w_1,w_0) = \arg\min_{w_1,w_0} \frac{1}{N}\sum_{i=1}^{N}(y_i - (w_1 x_i + w_0))^2
```

:::

:::{admonition} Interaktive Übung: Finde die beste Gerade von Hand

Bevor wir die exakte Formel betrachten, kannst du im Widget selbst ausprobieren, welche Gerade gut zu den Daten passt.

````{anywidget} ../widgets/regression-playground.mjs
:css: ../widgets/interactive-plots.css
{
  "points": [[38, 590], [42, 660], [47, 710], [51, 760], [58, 870], [63, 910], [67, 980], [72, 1040], [78, 1180], [85, 1290], [92, 1410], [105, 1620]],
  "w_1": 11,
  "w_0": 180
}
````

Arbeite dabei in drei Schritten:

1. Stelle zuerst nur nach Augenmaß eine möglichst gute Gerade ein.
2. Beobachte danach, wie sich der MSE verändert.
3. Vergleiche deine manuelle Lösung mit einer deutlich zu flachen und einer deutlich zu steilen Gerade.

:::

Weiter geht es mit [der expliziten Lösung in einer Dimension](03-1f-loesung-in-einer-dimension.md).