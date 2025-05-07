import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function Heatmap() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = 400;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };

    svg.attr("width", width).attr("height", height);

    // Create fake X and Y axes labels
    const xLabels = ["Low", "Medium", "High"];
    const yLabels = ["Low", "Moderate", "High"];

    // Create scales
    const xScale = d3.scaleBand()
      .domain(xLabels)
      .range([margin.left, width - margin.right])
      .padding(0.05);

    const yScale = d3.scaleBand()
      .domain(yLabels)
      .range([margin.top, height - margin.bottom])
      .padding(0.05);

    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateReds)
      .domain([0, 1]);

    // Fake values just for demo
    const data = [
        { x: "Low", y: "Low", value: 0.2 },
        { x: "Low", y: "Moderate", value: 0.4 },
        { x: "Low", y: "High", value: 0.7 },
        { x: "Medium", y: "Low", value: 0.3 },
        { x: "Medium", y: "Moderate", value: 0.6 },
        { x: "Medium", y: "High", value: 0.9 },
        { x: "High", y: "Low", value: 0.4 },
        { x: "High", y: "Moderate", value: 0.7 },
        { x: "High", y: "High", value: 1.0 },
      ];
      

    // Draw squares
    svg.selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.x))
      .attr("y", d => yScale(d.y))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .style("fill", d => colorScale(d.value));

    // X Axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Y Axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Physical Activity vs Stress Level");

  }, []);

  return <svg ref={svgRef}></svg>;
}

export default Heatmap;
