---
title: Einheit 3 Supervised Learning, lineare und logistische Regression
---

# Einheit 3

**Verantwortlich:** Georg

## Einordnung

In dieser Einheit lernen die Studierenden ueberwachtes Lernen an zwei sehr typischen Modellen kennen. Der Schwerpunkt liegt zunaechst auf der linearen Regression als Idee der "besten passenden Geraden". Danach folgt ein erster Ausblick auf logistische Regression fuer Klassifikationsaufgaben.

## Lernziele

- Ueberwachtes Lernen als Vorhersageproblem beschreiben
- Lineare Regression als Modell fuer kontinuierliche Zielvariablen verstehen
- Logistische Regression fuer Klassifikationsaufgaben einordnen
- Trainingsdaten, Merkmale und Zielvariablen sauber unterscheiden

## Empfohlener Ablauf

1. Einstieg und Motivation
2. Input per Video
3. Gefuehrte Beispielaufgabe
4. Kurze Selbstkontrolle per Quiz
5. Interaktive Uebung "Finde die beste Gerade"
6. Transfer zur logistischen Regression

## Inhalt

### 1. Supervised Learning als Grundidee

Beim supervised learning lernen Modelle aus Beispielen mit bekannter Zielvariable. Die Daten bestehen typischerweise aus:

- Merkmalen, also Eingaben
- Zielwerten, also den gewuenschten Ausgaben
- einem Modell, das aus den Beispielen einen Zusammenhang lernt

Typische Aufgaben sind:

- Regression: Vorhersage kontinuierlicher Werte
- Klassifikation: Zuordnung zu Klassen

```{note}
Lineare Regression ist ein guter Einstieg, weil sich die Modellidee visuell und intuitiv erklaeren laesst.
```

### 2. Lineare Regression

Die lineare Regression versucht, einen Zusammenhang zwischen einer Eingangsvariablen `x` und einer Zielvariablen `y` durch eine Gerade zu beschreiben:

```{math}
y = mx + b
```

Dabei steht:

- `m` fuer die Steigung
- `b` fuer den Achsenabschnitt

Die zentrale Frage lautet: Welche Gerade beschreibt die vorhandenen Datenpunkte moeglichst gut?

### 3. Logistische Regression als Ausblick

Die logistische Regression gehoert trotz ihres Namens zur Klassifikation. Statt einen kontinuierlichen Wert vorherzusagen, schaetzt sie Wahrscheinlichkeiten fuer Klassen, etwa "bestanden" oder "nicht bestanden".

```{tip}
In der Lehre kann die logistische Regression hier bewusst nur als Bruecke eingefuehrt werden. Die eigentliche Vertiefung kann spaeter folgen.
```

## Video

### Videobaustein 1

**Arbeitstitel:** Supervised Learning und die Idee der besten Geraden

**Dauer:** 6 bis 8 Minuten

**Inhalt des Videos:**

- Was bedeutet ueberwachtes Lernen?
- Unterschied zwischen Regression und Klassifikation
- Datenpunkte in einem Koordinatensystem
- Warum nicht jede Gerade gleich gut ist
- Intuition von Fehler und Anpassung

**Moegliche Visualisierung:**

- Punktewolke mit mehreren moeglichen Geraden
- Schrittweiser Vergleich guter und schlechter Fits

```{important}
Hier kann spaeter ein eingebettetes Video, ein Panopto-Link oder ein H5P-Element eingefuegt werden.
```

## Beispiel

### Gefuehrte Beispielaufgabe

Eine Lehrperson beobachtet den Zusammenhang zwischen Lernzeit und Punktzahl in einem Quiz:

| Lernzeit in Stunden | Punktzahl |
| --- | --- |
| 1 | 52 |
| 2 | 58 |
| 3 | 64 |
| 4 | 71 |
| 5 | 77 |

Leitfragen:

1. Welcher Trend ist sichtbar?
2. Wuerde eine steigende oder fallende Gerade besser passen?
3. Welche Punktzahl waere fuer `6` Stunden Lernzeit plausibel?

```{note}
Hier kann in einer spaeteren Ausbaustufe ein Notebook mit Plot und Regressionsgerade verlinkt werden.
```

## Quiz

### Selbstkontrolle

**Frage 1:** Welche Aufgabe passt typischerweise zur linearen Regression?

- A: Vorhersage einer kontinuierlichen Groesse
- B: Sortieren von Dokumenten nach Thema
- C: Einteilen in feste Cluster

**Richtige Antwort:** A

**Frage 2:** Was beschreibt bei `y = mx + b` die Steigung?

- A: `b`
- B: `m`
- C: `y`

**Richtige Antwort:** B

**Frage 3:** Wofuer wird logistische Regression typischerweise verwendet?

- A: Clustering
- B: Klassifikation
- C: Dimensionsreduktion

**Richtige Antwort:** B

## Interaktivitaet

### Finde die beste Gerade

Die Studierenden erhalten ein Streudiagramm mit wenigen Datenpunkten und drei moeglichen Geraden. Ihre Aufgabe ist es, die plausibelste Gerade zu waehlen und die Entscheidung kurz zu begruenden.

**Aufgabenidee:**

Gegeben sind die Punkte:

- `(1, 2)`
- `(2, 3)`
- `(3, 5)`
- `(4, 4.5)`
- `(5, 6)`

Welche Gerade passt am besten?

- Gerade A: `y = 0.5x + 1`
- Gerade B: `y = x + 1`
- Gerade C: `y = 2x`

````{anywidget} ../widgets/best-fit-line.mjs
:css: ../widgets/best-fit-line.css
{
  "points": [[1, 2], [2, 3], [3, 5], [4, 4.5], [5, 6]],
  "choices": [
    { "id": "A", "label": "Gerade A: y = 0.5x + 1" },
    { "id": "B", "label": "Gerade B: y = x + 1" },
    { "id": "C", "label": "Gerade C: y = 2x" }
  ],
  "correct": "B"
}
````

**Arbeitsauftrag:**

1. Schaetze visuell, welche Gerade am besten passt.
2. Begruende deine Wahl mit Blick auf die Abstaende der Punkte zur Geraden.
3. Diskutiere, warum nicht jeder Punkt exakt auf der Geraden liegen muss.

```{tip}
Didaktisch funktioniert diese Aufgabe besonders gut als Drag-and-Drop, Mehrfachwahl oder kurze Freitextaufgabe mit anschliessender Musterloesung.
```

### H5P-Variante

Zusaetzlich zur nativen Widget-Version kann die Aufgabe auch als externes H5P-Element bearbeitet werden:

```{iframe} https://app.lumi.education/run/cd-8H3
:width: 100%
:align: center
:title: H5P Aufgabe Finde die beste Gerade
```

```{note}
Falls das eingebettete H5P in einzelnen Browsern oder Datenschutzkontexten nicht direkt laedt, kann es auch direkt unter [Lumi H5P Aufgabe](https://app.lumi.education/run/cd-8H3) geoeffnet werden.
```

## Transfer

Zum Abschluss kann der Unterschied zur logistischen Regression knapp herausgestellt werden:

- Lineare Regression sagt einen Zahlenwert vorher.
- Logistische Regression sagt eine Klassenzugehoerigkeit beziehungsweise Wahrscheinlichkeit voraus.

## Materialien

- Vorlesungsvideo zu supervised learning
- Visualisierung einer Regressionsgeraden
- Kleines Notebook mit Streudiagramm und Fit
- Quiz oder H5P-Aufgabe
- Transferfrage zur logistischen Regression
