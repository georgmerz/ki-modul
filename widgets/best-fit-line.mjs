function lineForChoice(choice) {
  if (choice === 'A') return { m: 0.5, b: 1 };
  if (choice === 'B') return { m: 1, b: 1 };
  if (choice === 'C') return { m: 2, b: 0 };
  return null;
}

function squaredError(points, line) {
  return points.reduce((sum, [x, y]) => {
    const predicted = line.m * x + line.b;
    return sum + (y - predicted) ** 2;
  }, 0);
}

function drawScene(svg, points, line, selected) {
  const width = 520;
  const height = 360;
  const pad = 36;
  const xMin = 0;
  const xMax = 6;
  const yMin = 0;
  const yMax = 10;

  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (width - pad * 2);
  const sy = (y) => height - pad - ((y - yMin) / (yMax - yMin)) * (height - pad * 2);

  while (svg.firstChild) svg.removeChild(svg.firstChild);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Streudiagramm mit auswählbarer Regressionsgerade');

  const ns = 'http://www.w3.org/2000/svg';

  const bg = document.createElementNS(ns, 'rect');
  bg.setAttribute('x', '0');
  bg.setAttribute('y', '0');
  bg.setAttribute('width', String(width));
  bg.setAttribute('height', String(height));
  bg.setAttribute('rx', '14');
  bg.setAttribute('fill', '#fcfcf8');
  svg.appendChild(bg);

  for (let i = 1; i <= 5; i += 1) {
    const vLine = document.createElementNS(ns, 'line');
    vLine.setAttribute('x1', String(sx(i)));
    vLine.setAttribute('x2', String(sx(i)));
    vLine.setAttribute('y1', String(sy(yMin)));
    vLine.setAttribute('y2', String(sy(yMax)));
    vLine.setAttribute('stroke', '#e7e2d8');
    vLine.setAttribute('stroke-width', '1');
    svg.appendChild(vLine);
  }

  for (let i = 1; i <= 9; i += 1) {
    const hLine = document.createElementNS(ns, 'line');
    hLine.setAttribute('x1', String(sx(xMin)));
    hLine.setAttribute('x2', String(sx(xMax)));
    hLine.setAttribute('y1', String(sy(i)));
    hLine.setAttribute('y2', String(sy(i)));
    hLine.setAttribute('stroke', '#e7e2d8');
    hLine.setAttribute('stroke-width', '1');
    svg.appendChild(hLine);
  }

  const xAxis = document.createElementNS(ns, 'line');
  xAxis.setAttribute('x1', String(sx(xMin)));
  xAxis.setAttribute('x2', String(sx(xMax)));
  xAxis.setAttribute('y1', String(sy(yMin)));
  xAxis.setAttribute('y2', String(sy(yMin)));
  xAxis.setAttribute('stroke', '#49423a');
  xAxis.setAttribute('stroke-width', '2');
  svg.appendChild(xAxis);

  const yAxis = document.createElementNS(ns, 'line');
  yAxis.setAttribute('x1', String(sx(xMin)));
  yAxis.setAttribute('x2', String(sx(xMin)));
  yAxis.setAttribute('y1', String(sy(yMin)));
  yAxis.setAttribute('y2', String(sy(yMax)));
  yAxis.setAttribute('stroke', '#49423a');
  yAxis.setAttribute('stroke-width', '2');
  svg.appendChild(yAxis);

  for (let i = 1; i <= 5; i += 1) {
    const label = document.createElementNS(ns, 'text');
    label.setAttribute('x', String(sx(i)));
    label.setAttribute('y', String(sy(yMin) + 20));
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'axis-label');
    label.textContent = String(i);
    svg.appendChild(label);
  }

  for (let i = 2; i <= 8; i += 2) {
    const label = document.createElementNS(ns, 'text');
    label.setAttribute('x', String(sx(xMin) - 14));
    label.setAttribute('y', String(sy(i) + 4));
    label.setAttribute('text-anchor', 'end');
    label.setAttribute('class', 'axis-label');
    label.textContent = String(i);
    svg.appendChild(label);
  }

  const xTitle = document.createElementNS(ns, 'text');
  xTitle.setAttribute('x', String((sx(xMin) + sx(xMax)) / 2));
  xTitle.setAttribute('y', String(height - 8));
  xTitle.setAttribute('text-anchor', 'middle');
  xTitle.setAttribute('class', 'axis-title');
  xTitle.textContent = 'x';
  svg.appendChild(xTitle);

  const yTitle = document.createElementNS(ns, 'text');
  yTitle.setAttribute('x', '14');
  yTitle.setAttribute('y', String((sy(yMin) + sy(yMax)) / 2));
  yTitle.setAttribute('text-anchor', 'middle');
  yTitle.setAttribute('class', 'axis-title');
  yTitle.setAttribute('transform', `rotate(-90 14 ${(sy(yMin) + sy(yMax)) / 2})`);
  yTitle.textContent = 'y';
  svg.appendChild(yTitle);

  if (line) {
    const x1 = xMin;
    const x2 = xMax;
    const y1 = line.m * x1 + line.b;
    const y2 = line.m * x2 + line.b;
    const lineEl = document.createElementNS(ns, 'line');
    lineEl.setAttribute('x1', String(sx(x1)));
    lineEl.setAttribute('y1', String(sy(y1)));
    lineEl.setAttribute('x2', String(sx(x2)));
    lineEl.setAttribute('y2', String(sy(y2)));
    lineEl.setAttribute('stroke', selected ? '#c84c22' : '#8a8174');
    lineEl.setAttribute('stroke-width', selected ? '4' : '3');
    lineEl.setAttribute('stroke-linecap', 'round');
    svg.appendChild(lineEl);
  }

  points.forEach(([x, y]) => {
    const point = document.createElementNS(ns, 'circle');
    point.setAttribute('cx', String(sx(x)));
    point.setAttribute('cy', String(sy(y)));
    point.setAttribute('r', '6');
    point.setAttribute('fill', '#1d4f73');
    point.setAttribute('stroke', '#ffffff');
    point.setAttribute('stroke-width', '2');
    svg.appendChild(point);
  });
}

function render({ model, el }) {
  const points = model.get('points') ?? [
    [1, 2],
    [2, 3],
    [3, 5],
    [4, 4.5],
    [5, 6],
  ];
  const choices = model.get('choices') ?? [
    { id: 'A', label: 'Gerade A: y = 0.5x + 1' },
    { id: 'B', label: 'Gerade B: y = x + 1' },
    { id: 'C', label: 'Gerade C: y = 2x' },
  ];
  const correct = model.get('correct') ?? 'B';
  let selected = model.get('selected') ?? null;

  const root = document.createElement('div');
  root.className = 'fit-widget';

  const heading = document.createElement('p');
  heading.className = 'fit-widget-title';
  heading.textContent = 'Waehle die Gerade, die die Punkte am besten beschreibt.';
  root.appendChild(heading);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('fit-widget-chart');
  root.appendChild(svg);

  const controls = document.createElement('div');
  controls.className = 'fit-widget-controls';
  root.appendChild(controls);

  const feedback = document.createElement('div');
  feedback.className = 'fit-widget-feedback';
  feedback.setAttribute('aria-live', 'polite');
  root.appendChild(feedback);

  const hint = document.createElement('p');
  hint.className = 'fit-widget-hint';
  hint.textContent = 'Tipp: Achte auf die senkrechten Abstaende der Punkte zur Geraden.';
  root.appendChild(hint);

  function update() {
    drawScene(svg, points, lineForChoice(selected), Boolean(selected));

    Array.from(controls.querySelectorAll('button')).forEach((button) => {
      button.classList.toggle('is-selected', button.dataset.choice === selected);
      button.setAttribute('aria-pressed', String(button.dataset.choice === selected));
    });

    if (!selected) {
      feedback.innerHTML = '<strong>Noch keine Auswahl.</strong> Probiere eine Gerade aus.';
      return;
    }

    const currentLine = lineForChoice(selected);
    const error = squaredError(points, currentLine).toFixed(2);

    if (selected === correct) {
      feedback.innerHTML =
        `<strong>Sehr gut.</strong> ${choices.find((c) => c.id === selected).label} passt hier am besten. ` +
        `Die quadratische Gesamtabweichung ist mit ${error} am kleinsten.`;
    } else {
      feedback.innerHTML =
        `<strong>Noch nicht optimal.</strong> ${choices.find((c) => c.id === selected).label} ` +
        `liegt fuer mehrere Punkte weiter entfernt. Die quadratische Gesamtabweichung ist ${error}.`;
    }
  }

  choices.forEach((choice) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.choice = choice.id;
    button.textContent = choice.label;
    button.addEventListener('click', () => {
      selected = choice.id;
      model.set('selected', selected);
      update();
    });
    controls.appendChild(button);
  });

  el.appendChild(root);
  update();

  return () => root.remove();
}

export default { render };
