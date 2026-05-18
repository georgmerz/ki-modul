---
title: "3.2 Logistische Regression"
---

# 3.2 Logistische Regression

![Abstrakte Visualisierung einer Sigmoid-Kurve und zweier Klassen von Datenpunkten](../media/kapitel-3-2-logistische-regression-banner.png)

*Visualisierung der logistischen Regression mit Sigmoid-Kurve und Klassifikation*

Die logistische Regression gehört ebenfalls zum Supervised Learning. Anders als die lineare Regression wird sie aber nicht für die Vorhersage eines beliebigen Zahlenwerts genutzt, sondern für Klassifikationsaufgaben.

Ein typisches Beispiel ist die Frage, ob ein Kredit ausfallgefährdet ist, ob eine E-Mail Spam ist oder ob ein Tumor als gutartig oder bösartig eingeschätzt wird.

:::{admonition} Lernziele

Nach diesem Kapitel kannst du:

1. den Unterschied zwischen Regression und Klassifikation beschreiben,
2. die logistische Regression als Wahrscheinlichkeitsmodell einordnen,
3. die Sigmoid-Funktion als zentrales Element des Modells erklären,
4. eine Entscheidungsgrenze inhaltlich interpretieren,
5. typische Einsatzgebiete und Grenzen benennen.

:::

## Von der linearen zur logistischen Regression

Die lineare Regression bildet eine Gerade und liefert dadurch beliebige reelle Werte. Für Klassifikation ist das unpraktisch, weil wir meist eine Wahrscheinlichkeit zwischen 0 und 1 brauchen.

Die logistische Regression kombiniert deshalb einen linearen Ausdruck mit der Sigmoid-Funktion:

```{math}
z = \theta_0 + \theta_1 x_1 + \dots + \theta_p x_p
```

```{math}
\sigma(z) = \frac{1}{1 + e^{-z}}
```

Damit wird aus dem linearen Ausdruck ein Wert zwischen 0 und 1.

## Interpretation

Das Modell gibt für einen Datenpunkt eine Wahrscheinlichkeit aus, dass dieser zur positiven Klasse gehört.

Ein Beispiel:

- $P(y=1 \mid x) = 0{,}87$ bedeutet, dass das Modell die positive Klasse für wahrscheinlich hält.
- $P(y=1 \mid x) = 0{,}18$ bedeutet, dass das Modell eher die negative Klasse erwartet.

Um aus der Wahrscheinlichkeit eine Klasse zu machen, wird meist ein Schwellenwert verwendet, zum Beispiel 0,5.

## Entscheidungsgrenze

Die Entscheidungsgrenze trennt die Bereiche, in denen das Modell die eine oder die andere Klasse vorhersagt.

Bei nur einem Merkmal ist das ein Schwellenwert auf einer Zahlengeraden. Bei zwei Merkmalen ist es eine Linie, bei mehreren Merkmalen allgemeiner eine Hyperebene.

## Typische Einsatzgebiete

- Spam-Erkennung
- Kreditbewertung
- Medizinische Risikoeinschätzung
- Kundenabwanderung
- Bestehen oder Nichtbestehen einer Pruefung

## Abgrenzung zur linearen Regression

Die lineare Regression ist geeignet, wenn eine Zielgröße wie Preis, Temperatur oder Umsatz vorhergesagt werden soll.

Die logistische Regression ist geeignet, wenn entschieden werden soll, zu welcher Klasse ein Objekt gehört.

## Ausblick

Im weiteren Verlauf des Moduls wird die logistische Regression wichtig, weil sie den Übergang von Regressionsproblemen zu Klassifikationsproblemen markiert. Sie verbindet ein gut interpretierbares lineares Modell mit einer echten Entscheidungsregel.