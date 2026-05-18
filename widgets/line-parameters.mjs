function createSvg(width, height) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Gerade mit veraenderbaren Parametern m und b');
  return svg;
}

function drawAxes(svg, sx, sy, xTicks, yTicks) {
  const ns = 'http://www.w3.org/2000/svg';

  xTicks.forEach((x) => {
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', String(sx(x)));
    line.setAttribute('x2', String(sx(x)));
    line.setAttribute('y1', String(sy(-10)));
    line.setAttribute('y2', String(sy(10)));
    line.setAttribute('stroke', '#ebe4d7');
    svg.appendChild(line);

    if (x !== 0) {
      const label = document.createElementNS(ns, 'text');
      label.setAttribute('x', String(sx(x)));
      label.setAttribute('y', String(sy(-0.9)));
      label.setAttribute('fill', '#6b6358');
      label.setAttribute('font-size', '12');
      label.setAttribute('text-anchor', 'middle');
      label.textContent = String(x);
      svg.appendChild(label);
    }
  });

  yTicks.forEach((y) => {
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', String(sx(-10)));
    line.setAttribute('x2', String(sx(10)));
    line.setAttribute('y1', String(sy(y)));
    line.setAttribute('y2', String(sy(y)));
    line.setAttribute('stroke', '#ebe4d7');
    svg.appendChild(line);

    if (y !== 0) {
      const label = document.createElementNS(ns, 'text');
      label.setAttribute('x', String(sx(-0.8)));
      label.setAttribute('y', String(sy(y) + 4));
      label.setAttribute('fill', '#6b6358');
      label.setAttribute('font-size', '12');
      label.setAttribute('text-anchor', 'end');
      label.textContent = String(y);
      svg.appendChild(label);
    }
  });

  const xAxis = document.createElementNS(ns, 'line');
  xAxis.setAttribute('x1', String(sx(-10)));
  xAxis.setAttribute('x2', String(sx(10)));
  xAxis.setAttribute('y1', String(sy(0)));
  xAxis.setAttribute('y2', String(sy(0)));
  xAxis.setAttribute('stroke', '#49423a');
  xAxis.setAttribute('stroke-width', '2');
  svg.appendChild(xAxis);

  const yAxis = document.createElementNS(ns, 'line');
  yAxis.setAttribute('x1', String(sx(0)));
  yAxis.setAttribute('x2', String(sx(0)));
  yAxis.setAttribute('y1', String(sy(-10)));
  yAxis.setAttribute('y2', String(sy(10)));
  yAxis.setAttribute('stroke', '#49423a');
  yAxis.setAttribute('stroke-width', '2');
  svg.appendChild(yAxis);

  const xLabel = document.createElementNS(ns, 'text');
  xLabel.setAttribute('x', String(sx(9.4)));
  xLabel.setAttribute('y', String(sy(-0.8)));
  xLabel.setAttribute('fill', '#49423a');
  xLabel.setAttribute('font-size', '16');
  xLabel.setAttribute('font-weight', '600');
  xLabel.textContent = 'x';
  svg.appendChild(xLabel);

  const yLabel = document.createElementNS(ns, 'text');
  yLabel.setAttribute('x', String(sx(0.7)));
  yLabel.setAttribute('y', String(sy(9.2)));
  yLabel.setAttribute('fill', '#49423a');
  yLabel.setAttribute('font-size', '16');
  yLabel.setAttribute('font-weight', '600');
  yLabel.textContent = 'y';
  svg.appendChild(yLabel);
}

function render({ model, el }) {
  const width = 560;
  const height = 360;
  const pad = 36;
  const sx = (x) => pad + ((x + 10) / 20) * (width - pad * 2);
  const sy = (y) => height - pad - ((y + 10) / 20) * (height - pad * 2);

  const root = document.createElement('div');
  root.className = 'interactive-widget';

  const intro = document.createElement('p');
  intro.textContent = 'Verschiebe m und b und beobachte, wie sich Steigung und Lage der Geraden veraendern.';
  root.appendChild(intro);

  const svg = createSvg(width, height);
  root.appendChild(svg);

  const controls = document.createElement('div');
  controls.className = 'widget-controls';
  root.appendChild(controls);

  const feedback = document.createElement('div');
  feedback.className = 'widget-feedback';
  root.appendChild(feedback);

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
    output.textContent = Number(initial).toFixed(1);

    input.addEventListener('input', () => {
      output.textContent = Number(input.value).toFixed(1);
      update();
    });

    row.appendChild(label);
    row.appendChild(input);
    row.appendChild(output);
    controls.appendChild(row);
    return input;
  };

  const mSlider = makeSlider('m', -5, 5, 0.1, model.get('m') ?? 1);
  const bSlider = makeSlider('b', -10, 10, 0.5, model.get('b') ?? 0);

  function update() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    drawAxes(svg, sx, sy, [-10, -5, 0, 5, 10], [-10, -5, 0, 5, 10]);

    const ns = 'http://www.w3.org/2000/svg';
    const m = Number(mSlider.value);
    const b = Number(bSlider.value);
    const x1 = -10;
    const x2 = 10;
    const y1 = m * x1 + b;
    const y2 = m * x2 + b;

    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', String(sx(x1)));
    line.setAttribute('y1', String(sy(y1)));
    line.setAttribute('x2', String(sx(x2)));
    line.setAttribute('y2', String(sy(y2)));
    line.setAttribute('stroke', '#c84c22');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);

    feedback.innerHTML =
      `<strong>Aktuelle Gerade:</strong> y = ${m.toFixed(1)}x + ${b.toFixed(1)}<br>` +
      `Wenn m groesser wird, wird die Gerade steiler. Wenn b groesser wird, verschiebt sich die Gerade nach oben.`;
  }

  el.appendChild(root);
  update();

  return () => root.remove();
}

export default { render };
