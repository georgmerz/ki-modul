---
title: KI Online Modul
subtitle: Einfuehrung in die KI
---

# KI Online Modul

Dieses Jupyter Book bildet die aktuelle Gliederung des Moduls "Einfuehrung in die KI" ab. Die Inhalte sind in drei Bereiche gegliedert: Grundlagen der KI, erweiterte KI-Verfahren und Anwendungen sowie Ethik und Compliance.

## Modulueberblick

1. Grundlagen der KI, ca. 70 Prozent
2. Erweiterte KI-Verfahren und Anwendungen, ca. 20 Prozent
3. Ethik und Compliance im Bereich KI, ca. 10 Prozent

## Einheiten

- Einheit 1 bis 4: Grundlagen, maschinelles Lernen und Modellevaluation
- Einheit 5 bis 8: Symbolische KI, Suche, Entscheidungsbaeume und Unsicherheit
- Einheit 9 bis 12: Neuronale Netze, Sprachmodelle, Anwendungen und verantwortungsvoller KI-Einsatz

## Zusammenarbeit

- Georg: Einheiten 1 bis 4
- Emanuel: Einheiten 5 bis 8
- Darya: Einheiten 9 bis 12

## Lokale Vorschau

Installiere die Jupyter-Book-2-Werkzeuge und starte dann den lokalen Vorschau-Server:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
jupyter book start
```

Alternativ direkt mit MyST:

```bash
pip install mystmd
myst start
```

## Build

```bash
jupyter book build --html
```

Die generierte HTML-Version liegt anschliessend unter `_build/html`.
