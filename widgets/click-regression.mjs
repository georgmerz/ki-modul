function createSvg(width, height) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Interaktives Koordinatensystem fuer lineare Regression');
  return svg;
}

function computeFit(points) {
  if (points.length < 2) {
    return null;
  }

  const xMean = points.reduce((sum, [x]) => sum + x, 0) / points.length;
  const yMean = points.reduce((sum, [, y]) => sum + y, 0) / points.length;
  const numerator = points.reduce((sum, [x, y]) => sum + (x - xMean) * (y - yMean), 0);
  const denominator = points.reduce((sum, [x]) => sum + (x - xMean) ** 2, 0);

  if (denominator === 0) {
    return null;
  }

  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;
  const mse = points.reduce((sum, [x, y]) => sum + (y - (slope * x + intercept)) ** 2, 0) / points.length;
  return { slope, intercept, mse };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toSvgCoordinates(svg, event, width, height) {
  const rect = svg.getBoundingClientRect();
  const scaleX = width / rect.width;
  const scaleY = height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

function render({ el }) {
  const width = 620;
  const height = 420;
  const pad = 48;
  const xMin = 0;
  const xMax = 10;
  const yMin = 0;
  const yMax = 10;
  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (width - pad * 2);
  const sy = (y) => height - pad - ((y - yMin) / (yMax - yMin)) * (height - pad * 2);
  const fromScreenX = (screenX) => xMin + ((screenX - pad) / (width - pad * 2)) * (xMax - xMin);
  const fromScreenY = (screenY) => yMin + ((height - pad - screenY) / (height - pad * 2)) * (yMax - yMin);
  const ns = 'http://www.w3.org/2000/svg';

  let points = [];
  let fit = null;
  const root = document.createElement('div');
  root.className = 'interactive-widget';

  const intro = document.createElement('p');
  intro.textContent = 'Klicke in das Koordinatensystem, um Datenpunkte zu setzen. Die Regressionsgerade wird nach jedem neuen Punkt direkt neu berechnet.';
  root.appendChild(intro);

  const svg = createSvg(width, height);
  svg.classList.add('regression-canvas');
  root.appendChild(svg);

  const controls = document.createElement('div');
  controls.className = 'widget-actions';
  root.appendChild(controls);

  const metrics = document.createElement('div');
  metrics.className = 'widget-metrics';
  root.appendChild(metrics);

  const feedback = document.createElement('div');
  feedback.className = 'widget-feedback';
  root.appendChild(feedback);

  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.textContent = 'Alle loeschen';
  controls.appendChild(clearButton);

  function drawAxes() {
    for (let tick = 0; tick <= 10; tick += 1) {
      const vertical = document.createElementNS(ns, 'line');
      vertical.setAttribute('x1', String(sx(tick)));
      vertical.setAttribute('x2', String(sx(tick)));
      vertical.setAttribute('y1', String(sy(yMin)));
      vertical.setAttribute('y2', String(sy(yMax)));
      vertical.setAttribute('stroke', '#ebe4d7');
      svg.appendChild(vertical);

      const horizontal = document.createElementNS(ns, 'line');
      horizontal.setAttribute('x1', String(sx(xMin)));
      horizontal.setAttribute('x2', String(sx(xMax)));
      horizontal.setAttribute('y1', String(sy(tick)));
      horizontal.setAttribute('y2', String(sy(tick)));
      horizontal.setAttribute('stroke', '#ebe4d7');
      svg.appendChild(horizontal);

      if (tick < 10) {
        continue;
      }
    }

    [0, 2, 4, 6, 8, 10].forEach((tick) => {
      const xLabel = document.createElementNS(ns, 'text');
      xLabel.setAttribute('x', String(sx(tick)));
      xLabel.setAttribute('y', String(sy(0) + 22));
      xLabel.setAttribute('text-anchor', 'middle');
      xLabel.setAttribute('class', 'axis-label');
      xLabel.textContent = String(tick);
      svg.appendChild(xLabel);

      const yLabel = document.createElementNS(ns, 'text');
      yLabel.setAttribute('x', String(sx(0) - 14));
      yLabel.setAttribute('y', String(sy(tick) + 4));
      yLabel.setAttribute('text-anchor', 'end');
      yLabel.setAttribute('class', 'axis-label');
      yLabel.textContent = String(tick);
      svg.appendChild(yLabel);
    });

    const xAxis = document.createElementNS(ns, 'line');
    xAxis.setAttribute('x1', String(sx(xMin)));
    xAxis.setAttribute('x2', String(sx(xMax)));
    xAxis.setAttribute('y1', String(sy(0)));
    xAxis.setAttribute('y2', String(sy(0)));
    xAxis.setAttribute('stroke', '#49423a');
    xAxis.setAttribute('stroke-width', '2');
    svg.appendChild(xAxis);

    const yAxis = document.createElementNS(ns, 'line');
    yAxis.setAttribute('x1', String(sx(0)));
    yAxis.setAttribute('x2', String(sx(0)));
    yAxis.setAttribute('y1', String(sy(yMin)));
    yAxis.setAttribute('y2', String(sy(yMax)));
    yAxis.setAttribute('stroke', '#49423a');
    yAxis.setAttribute('stroke-width', '2');
    svg.appendChild(yAxis);

    const xTitle = document.createElementNS(ns, 'text');
    xTitle.setAttribute('x', String(sx(10)));
    xTitle.setAttribute('y', String(sy(0) + 40));
    xTitle.setAttribute('text-anchor', 'end');
    xTitle.setAttribute('class', 'axis-title');
    xTitle.textContent = 'x';
    svg.appendChild(xTitle);

    const yTitle = document.createElementNS(ns, 'text');
    yTitle.setAttribute('x', String(sx(0) - 6));
    yTitle.setAttribute('y', String(sy(10) - 10));
    yTitle.setAttribute('text-anchor', 'end');
    yTitle.setAttribute('class', 'axis-title');
    yTitle.textContent = 'y';
    svg.appendChild(yTitle);
  }

  function drawRegressionLine() {
    if (!fit) {
      return;
    }

    const startY = fit.slope * xMin + fit.intercept;
    const endY = fit.slope * xMax + fit.intercept;
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', String(sx(xMin)));
    line.setAttribute('y1', String(sy(startY)));
    line.setAttribute('x2', String(sx(xMax)));
    line.setAttribute('y2', String(sy(endY)));
    line.setAttribute('stroke', '#c84c22');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
  }

  function drawPoints() {
    points.forEach(([x, y], index) => {
      const point = document.createElementNS(ns, 'circle');
      point.setAttribute('cx', String(sx(x)));
      point.setAttribute('cy', String(sy(y)));
      point.setAttribute('r', '6');
      point.setAttribute('fill', '#1d4f73');
      point.setAttribute('stroke', '#ffffff');
      point.setAttribute('stroke-width', '2');
      point.dataset.index = String(index);
      svg.appendChild(point);
    });
  }

  function updateMetrics() {
    if (fit) {
      metrics.innerHTML =
        `<strong>Gerade:</strong> y = ${fit.slope.toFixed(2)}x ${fit.intercept < 0 ? '-' : '+'} ${Math.abs(fit.intercept).toFixed(2)}` +
        ` <strong>MSE:</strong> ${fit.mse.toFixed(3)}` +
        ` <strong>Punkte:</strong> ${points.length}`;
      return;
    }

    metrics.innerHTML = `<strong>Punkte:</strong> ${points.length}`;
  }

  function updateFeedback() {
    if (points.length === 0) {
      feedback.innerHTML = 'Noch keine Punkte gesetzt. Klicke in das Koordinatensystem, um zu starten.';
      return;
    }

    if (points.length < 2) {
      feedback.innerHTML = 'Fuer eine lineare Regression brauchst du mindestens zwei Punkte.';
      return;
    }

    feedback.innerHTML = 'Die orange Linie ist die berechnete Regressionsgerade fuer deine aktuell gesetzten Punkte.';
  }

  function update() {
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    drawAxes();
    drawRegressionLine();
    drawPoints();
    updateMetrics();
    updateFeedback();
  }

  svg.addEventListener('click', (event) => {
    const svgPoint = toSvgCoordinates(svg, event, width, height);
    const svgX = clamp(svgPoint.x, pad, width - pad);
    const svgY = clamp(svgPoint.y, pad, height - pad);

    const x = clamp(fromScreenX(svgX), xMin, xMax);
    const y = clamp(fromScreenY(svgY), yMin, yMax);
    points = [...points, [Number(x.toFixed(2)), Number(y.toFixed(2))]];
    fit = computeFit(points);
    update();
  });

  clearButton.addEventListener('click', () => {
    points = [];
    fit = null;
    update();
  });

  el.appendChild(root);
  update();

  return () => root.remove();
}

export default { render };