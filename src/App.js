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
      age: +d.age,
      physical_activity: +d.physical_activity,
      stress_level: +d.stress_level,
      smoking_status: (() => {
        if (d.smoking_status === "Never") return 0;
        if (d.smoking_status === "Former") return 1;
        if (d.smoking_status === "Current") return 2;
        return null;
      })(),
      alcohol_consumption: +d.alcohol_consumption,
      sleep_hours: +d.sleep_hours,
      air_pollution: +d.air_pollution_exposure,
      income_level: (() => {
        if (d.income_level === "Low") return 0;
        if (d.income_level === "Middle") return 1;
        if (d.income_level === "High") return 2;
        return null;
      })(),
      family_history: +d.family_history,
      dietary_habits: (() => {
        if (d.dietary_habits === "Unhealthy") return 0;
        if (d.dietary_habits === "Average") return 1;
        if (d.dietary_habits === "Healthy") return 2;
        return null;
      })(),
      obesity: +d.obesity,
      cholesterol_level: +d.cholesterol_level,
    })).then(parsed =>{
      console.log("Parsed Data:", parsed);
      setData(parsed);
    });
  }, []);
  
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
