import React from 'react';

function Filters({
  age, setAge,
  selectedColumn, setSelectedColumn,
  xVar, setXVar,
  yVar, setYVar,
  heatmapX, setHeatmapX,
  heatmapY, setHeatmapY
}) {
  const pieVariableOptions = [
    "stress_level", "obesity", "physical_activity", "alcohol_consumption", "income_level",
    "smoking_status", "dietary_habits", "family_history"
  ];
  const variableOptions = [
    "age", "stress_level", "sleep_hours", "cholesterol_level",
    "obesity", "physical_activity", "alcohol_consumption", "income_level",
    "smoking_status", "air_pollution_exposure", "dietary_habits", "family_history"
  ];

  return (
    <div>
      <h2>Filters</h2>
      <h3>Pie Chart Controller</h3>

      {/* Pie Chart Column Selection */}
      <label>Column of Interest:</label>
      <select value={selectedColumn} onChange={e => setSelectedColumn(e.target.value)}>
        {pieVariableOptions.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <hr />

      <h3>Scatterplot Controller</h3>

      {/* Age Slider (moved here) */}
      <label>Age Range: </label>
      <input
        type="range"
        min="10"
        max="100"
        value={age}
        onChange={e => setAge(+e.target.value)}
      />
      <p>Age ≤ {age}</p>

      {/* Scatterplot X and Y */}
      <label>X-Axis: </label>
      <select value={xVar} onChange={e => setXVar(e.target.value)}>
        {variableOptions.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <br />

      <label>Y-Axis: </label>
      <select value={yVar} onChange={e => setYVar(e.target.value)}>
        {variableOptions.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <hr />

      <h3>Heatmap Controller</h3>

      <label>X-Axis: </label>
      <select value={heatmapX} onChange={e => setHeatmapX(e.target.value)}>
        {variableOptions.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <br />

      <label>Y-Axis: </label>
      <select value={heatmapY} onChange={e => setHeatmapY(e.target.value)}>
        {variableOptions.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
