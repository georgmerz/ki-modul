---
title: "3.1.2 Regressionsproblem mathematisch formuliert"
kernelspec:
  name: python3
  display_name: Python 3
---

# 3.1.2 Regressionsproblem mathematisch formuliert

````{code-cell} python
:tags: remove-input

from jupyterquiz import display_quiz
````

Mathematisch wollen wir eine Funktion $f$ finden, die aus Eingabedaten $x$ eine Vorhersage $\hat{y}$ erzeugt:

```{math}
f(x) = \hat{y} \approx y
```

Dabei gilt:

- $x$: Eingabe oder Merkmalsvektor
- $y$: beobachteter Zielwert
- $\hat{y}$: vorhergesagter Zielwert
- $f$: die gesuchte Funktion

Für unser Beispiel bedeutet das: Aus den Wohnungsdaten wollen wir eine Funktion $f$ lernen, die, wenn wir alle Eigenschaften bis auf die Miete eingeben, eine Vorhersage $\hat{y}$ für die Miete macht, die möglichst nah am beobachteten Wert $y$ liegt.
Wenn wir die Funktion dann gelernt haben, können wir sie verwenden, um die Miete für neue Wohnungen zu schätzen, indem wir die entsprechenden Merkmale eingeben.

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


Weiter geht es mit [der Geraden in einer Dimension](03-1c-gerade-in-einer-dimension.md).