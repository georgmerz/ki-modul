function mse(points, m, b) {
  return points.reduce((sum, [x, y]) => sum + (y - (m * x + b)) ** 2, 0) / points.length;
}

function drawScene(svg, points, m, b) {
  const width = 620;
  const height = 400;
  const pad = 44;
  const xMin = 20;
  const xMax = 120;
  const yMin = 400;
  const yMax = 1600;
  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (width - pad * 2);
  const sy = (y) => height - pad - ((y - yMin) / (yMax - yMin)) * (height - pad * 2);

  while (svg.firstChild) svg.removeChild(svg.firstChild);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Wohnungsdaten mit interaktiv anpassbarer Regressionsgerade');

  const ns = 'http://www.w3.org/2000/svg';

  const bg = document.createElementNS(ns, 'rect');
  bg.setAttribute('x', '0');
  bg.setAttribute('y', '0');
  bg.setAttribute('width', String(width));
  bg.setAttribute('height', String(height));
  bg.setAttribute('rx', '12');
  bg.setAttribute('fill', '#fcfcf8');
  svg.appendChild(bg);

  [30, 50, 70, 90, 110].forEach((x) => {
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', String(sx(x)));
    line.setAttribute('x2', String(sx(x)));
    line.setAttribute('y1', String(sy(yMin)));
    line.setAttribute('y2', String(sy(yMax)));
    line.setAttribute('stroke', '#ebe4d7');
    svg.appendChild(line);
  });

  [500, 800, 1100, 1400].forEach((y) => {
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', String(sx(xMin)));
    line.setAttribute('x2', String(sx(xMax)));
    line.setAttribute('y1', String(sy(y)));
    line.setAttribute('y2', String(sy(y)));
    line.setAttribute('stroke', '#ebe4d7');
    svg.appendChild(line);
  });

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

  const line = document.createElementNS(ns, 'line');
  line.setAttribute('x1', String(sx(xMin)));
  line.setAttribute('y1', String(sy(m * xMin + b)));
  line.setAttribute('x2', String(sx(xMax)));
  line.setAttribute('y2', String(sy(m * xMax + b)));
  line.setAttribute('stroke', '#c84c22');
  line.setAttribute('stroke-width', '4');
  line.setAttribute('stroke-linecap', 'round');
  svg.appendChild(line);

  points.forEach(([x, y]) => {
    const yHat = m * x + b;

    const residual = document.createElementNS(ns, 'line');
    residual.setAttribute('x1', String(sx(x)));
    residual.setAttribute('x2', String(sx(x)));
    residual.setAttribute('y1', String(sy(y)));
    residual.setAttribute('y2', String(sy(yHat)));
    residual.setAttribute('stroke', '#8a8174');
    residual.setAttribute('stroke-dasharray', '5 4');
    svg.appendChild(residual);

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
    [30, 520],
    [45, 690],
    [50, 740],
    [60, 850],
    [70, 980],
    [80, 1100],
    [95, 1300],
    [110, 1480],
  ];

  const root = document.createElement('div');
  root.className = 'interactive-widget';

  const intro = document.createElement('p');
  intro.textContent = 'Passe Steigung und Achsenabschnitt an. Beobachte, wie sich Gerade, Residuen und MSE veraendern.';
  root.appendChild(intro);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  root.appendChild(svg);

  const controls = document.createElement('div');
  controls.className = 'widget-controls';
  root.appendChild(controls);

  const metrics = document.createElement('div');
  metrics.className = 'widget-metrics';
  root.appendChild(metrics);

  const feedback = document.createElement('div');
  feedback.className = 'widget-feedback';
  root.appendChild(feedback);

  const actions = document.createElement('div');
  actions.className = 'widget-actions';
  root.appendChild(actions);

  const makeSlider = (labelText, min, max, step, initial) => {
    const row = document.createElement('div');
    row.className = 'widget-control';

    const label = document.createElement('label');
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = 'range';
    input.min = String(min);
    input.max = String(max);
    input.step = String(step);
    input.value = String(initial);

    const output = document.createElement('output');
    output.textContent = Number(initial).toFixed(step < 1 ? 1 : 0);

    input.addEventListener('input', () => {
      output.textContent = Number(input.value).toFixed(step < 1 ? 1 : 0);
      update();
    });

    row.appendChild(label);
    row.appendChild(input);
    row.appendChild(output);
    controls.appendChild(row);
    return input;
  };

  const mSlider = makeSlider('m', 5, 20, 0.1, model.get('m') ?? 12);
  const bSlider = makeSlider('b', -200, 500, 10, model.get('b') ?? 150);

  const reset = document.createElement('button');
  reset.type = 'button';
  reset.textContent = 'Auf Startwerte setzen';
  reset.addEventListener('click', () => {
    mSlider.value = '12';
    bSlider.value = '150';
    controls.querySelectorAll('output')[0].textContent = '12.0';
    controls.querySelectorAll('output')[1].textContent = '150';
    update();
  });
  actions.appendChild(reset);

  function update() {
    const m = Number(mSlider.value);
    const b = Number(bSlider.value);
    const currentMse = mse(points, m, b);
    drawScene(svg, points, m, b);

    metrics.innerHTML =
      `<strong>Aktuelle Gerade:</strong> y = ${m.toFixed(1)}x + ${b.toFixed(0)}` +
      ` <strong>MSE:</strong> ${currentMse.toFixed(2)}`;

    if (currentMse < 4000) {
      feedback.innerHTML = '<strong>Sehr guter Fit.</strong> Die Gerade folgt dem Trend der Daten sehr gut.';
    } else if (currentMse < 20000) {
      feedback.innerHTML = '<strong>Solider Fit.</strong> Achte besonders auf grosse Residuen bei grossen Wohnflaechen.';
    } else {
      feedback.innerHTML = '<strong>Deutlich verbesserbar.</strong> Veraendere m oder b, bis die vertikalen Abstaende kleiner werden.';
    }
  }

  el.appendChild(root);
  update();

  return () => root.remove();
}

export default { render };
