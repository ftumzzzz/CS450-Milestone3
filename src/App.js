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
  const [xVar, setXVar] = useState("cholesterol_level");
  const [yVar, setYVar] = useState("stress_level");

  useEffect(() => {
    d3.csv(process.env.PUBLIC_URL + "/heart_attack_prediction_indonesia.csv", d => ({
      age: +d.age,
      physical_activity: (() => {
        if (d.physical_activity === "Low") return 0;
        if (d.physical_activity === "Moderate") return 1;
        if (d.physical_activity === "High") return 2;
        return null;
      })(),
      stress_level: (() => {
        if (d.stress_level === "Low") return 0;
        if (d.stress_level === "Moderate") return 1;
        if (d.stress_level === "High") return 2;
        return null;
      })(),
      smoking_status: (() => {
        if (d.smoking_status === "Never") return 0;
        if (d.smoking_status === "Past") return 1;
        if (d.smoking_status === "Current") return 2;
        return null;
      })(),
      alcohol_consumption: (() => {
        if (d.alcohol_consumption === "None") return 0;
        if (d.alcohol_consumption === "Moderate") return 1;
        if (d.alcohol_consumption === "High") return 2;
        return null;
      })(),
      sleep_hours: +d.sleep_hours,
      air_pollution: (() => {
        if (d.air_pollution_exposure === "Low") return 0;
        if (d.air_pollution_exposure === "Moderate") return 1;
        if (d.air_pollution_exposure === "High") return 2;
        return null;
      })(),
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
      heart_attack: +d.heart_attack,
    })).then(parsed =>{
      console.log("Parsed Data:", parsed);
      setData(parsed);
    });
  }, []);
  
  const filteredData = data.filter(d => d.age <= age);
  console.log("Filtered Data:", filteredData);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Heart Attack Risk Dashboard</h1>
      </header>
      <div className="dashboard">
        <div className="left-panel">
          <Filters 
          age={age} setAge={setAge} 
          selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn}
          xVar={xVar} setXVar={setXVar}
          yVar={yVar} setYVar={setYVar}
          />
        </div>
        <div className="right-panel">
          <div className="top-chart">
            <Heatmap data={filteredData} />
            <ScatterPlot data={filteredData} xVar={xVar} yVar={yVar} />
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
