import React from 'react';
import Filters from './Filters';
import Heatmap from './Heatmap';
import PieChart from './PieChart';
import TreeDiagram from './TreeDiagram';
import './App.css';

function App() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Heart Attack Risk Dashboard</h1>
      </header>
      <div className="dashboard">
        <div className="left-panel">
          <Filters />
        </div>
        <div className="right-panel">
          <div className="top-chart">
            <Heatmap />
          </div>
          <div className="bottom-charts">
            <PieChart />
            <TreeDiagram />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
