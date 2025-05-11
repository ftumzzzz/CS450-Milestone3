import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function PieChart({ data, selectedColumn }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(svgRef.current.parentNode)
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("padding", "6px 10px")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none");
    svg.selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const heartAttackData = data.filter(d => d.heart_attack === 1);

    const counts = {};
    heartAttackData.forEach(d => {
      const value = d[selectedColumn];
      if (value !== null && value !== undefined) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });

  const labelMaps = {
    physical_activity: { 0: "Low", 1: "Moderate", 2: "High" },
    stress_level: { 0: "Low", 1: "Moderate", 2: "High" },
    smoking_status: { 0: "Never", 1: "Former", 2: "Current" },
    alcohol_consumption: { 0: "None", 1: "Moderate", 2: "High" },
    air_pollution: { 0: "Low", 1: "Moderate", 2: "High" },
    income_level: { 0: "Low", 1: "Middle", 2: "High" },
    dietary_habits: { 0: "Unhealthy", 1: "Average", 2: "Healthy" },
    family_history: { 0: "No", 1: "Yes" },
    obesity: { 0: "No", 1: "Yes" },
    default: val => val
  };



    const pie = d3.pie().value(d => d[1]);
    const total = Object.values(counts).reduce((sum, val) => sum + val, 0);
    const data_ready = pie(Object.entries(counts));

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius - 10);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .attr("width", width)
      .attr("height", height);

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(`Heart Attack Cases of ${selectedColumn.replace(/_/g, " ")}`);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2 + 10})`);


    g.selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[0]))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .on("mouseover", (event, d) => {
        const percent = ((d.data[1] / total) * 100).toFixed(1);
        tooltip
          .style("visibility", "visible")
          .text(`${labelMaps[d.data[0]] || d.data[0]}: ${percent}%`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY - 30}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
    
    const currentLabelMap = labelMaps[selectedColumn] || labelMaps.default;

    g.selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => typeof currentLabelMap === 'function'
        ? currentLabelMap(d.data[0])
        : currentLabelMap[d.data[0]] || d.data[0])
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px");

  }, [data, selectedColumn]);

  return <svg ref={svgRef}></svg>;
}
export default PieChart;