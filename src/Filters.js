import React, { useState } from 'react';

function Filters() {
  const [age, setAge] = useState(50);
  const [column, setColumn] = useState("physical_activity");

  const handleAgeChange = (e) => setAge(e.target.value);
  const handleColumnChange = (e) => setColumn(e.target.value);

  return (
    <div>
      <h2>Filters</h2>

      <label>Age Range:</label>
      <input
        type="range"
        min="10"
        max="100"
        value={age}
        onChange={handleAgeChange}
      />
      <p>Age: {age}</p>

      <label>Column of Interest:</label>
      <select value={column} onChange={handleColumnChange}>
        <option value="physical_activity">Physical Activity</option>
        <option value="stress_level">Stress Level</option>
        <option value="smoking_status">Smoking Status</option>
        <option value="alcohol_consumption">Alcohol Consumption</option>
        <option value="obesity">Obesity</option>
        <option value="cholesterol_level">Cholesterol Level</option>
        <option value="sleep_hours">Sleep Hours</option>
        <option value="air_pollution_exposure">Air Pollution</option>
        <option value="dietary_habits">Dietary Habits</option>
        <option value="family_history">Family History</option>
        <option value="income_level">Income Level</option>
      </select>
    </div>
  );
}

export default Filters;
