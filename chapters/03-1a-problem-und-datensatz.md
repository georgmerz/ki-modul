---
title: "3.1.1 Problem und Datensatz"
---

# 3.1.1 Problem und Datensatz

Stell dir vor, du bekommst ein Wohnungsangebot mit folgenden Daten:

- Wohnfläche: 75 m2
- Zimmer: 3
- Baujahr: 2005
- Entfernung zum Zentrum: 4 km
- Etage: 3
- Balkon: Ja
- Energieklasse: B
- Miete: 1200 EUR

Du willst wissen, ob das ein gut preis ist. 

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

Das ist also ein klassisches Problem des Supervised Learning in Form einer Regression: Es gibt einen numerischen Zielwert/Label (die Miete), den ich vorhersagen will, und es gibt Eingabedaten (Features), die ich verwenden kann, um die Vorhersage zu machen. Dabei ist der Zielwert keine Klasse, sondern ein kontinuierlicher Wert, was die Aufgabe zu einem Regressionsproblem macht im Gegensatz zu einem Klassifikationsproblem, bei dem der Zielwert eine Klasse wäre.


Weiter geht es mit [dem mathematisch formulierten Regressionsproblem](03-1b-regressionsproblem-mathematisch.md).