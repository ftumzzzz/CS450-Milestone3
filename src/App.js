import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Filters from './Filters';
import Heatmap from './Heatmap';
import PieChart from './PieChart';
import TreeDiagram from './TreeDiagram';
import ScatterPlot from './ScatterPlot';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [age, setAge] = useState(50);
  const [selectedColumn, setSelectedColumn] = useState("physical_activity");

  useEffect(() => {
    d3.csv(process.env.PUBLIC_URL + "/heart_attack_prediction_indonesia.csv", d => ({
      sleep_hours: +d.sleep_hours,
      stress_level: +d.stress_level,
      age: +d.age,
      [selectedColumn]: d[selectedColumn],
    })).then(setData);
  }, [selectedColumn]);

  const filteredData = data.filter(d => d.age <= age);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Heart Attack Risk Dashboard</h1>
      </header>
      <div className="dashboard">
        <div className="left-panel">
          <Filters age={age} setAge={setAge} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} />
        </div>
        <div className="right-panel">
          <div className="top-chart">
            <Heatmap data={filteredData} />
            <ScatterPlot data={filteredData} />
          </div>
          <div className="bottom-charts">
            <PieChart data={filteredData} selectedColumn={selectedColumn} />
            <TreeDiagram data={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
