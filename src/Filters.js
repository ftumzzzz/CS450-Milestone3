import React from 'react';

function Filters({
  age, setAge,
  selectedColumn, setSelectedColumn,
  xVar, setXVar,
  yVar, setYVar
}) {
  const variableOptions = [
    "age", "stress_level", "sleep_hours", "cholesterol_level",
    "obesity", "physical_activity", "alcohol_consumption", "income_level",
    "smoking_status", "air_pollution_exposure", "dietary_habits", "family_history"
  ];

  return (
    <div>
      <h2>Filters</h2>

      <label>Age Range:</label>
      <input
        type="range"
        min="10"
        max="100"
        value={age}
        onChange={e => setAge(+e.target.value)}
      />
      <p>Age ≤ {age}</p>

      <label>Column of Interest:</label>
      <select value={selectedColumn} onChange={e => setSelectedColumn(e.target.value)}>
        {variableOptions.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
      
      <br></br>
      <label>X-Axis:</label>
      <select value={xVar} onChange={e => setXVar(e.target.value)}>
        {variableOptions.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <br></br>
      <label>Y-Axis:</label>
      <select value={yVar} onChange={e => setYVar(e.target.value)}>
        {variableOptions.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );
}


export default Filters;
