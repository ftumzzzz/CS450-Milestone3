import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function PieChart({ data, selectedColumn }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const counts = {};
    data.forEach(d => {
      const value = d[selectedColumn];
      if (value !== null && value !== undefined) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });

    const labelMap = {
      0: "Low",
      1: "Moderate",
      2: "High",
      null: "Unknown"
    };

    const pie = d3.pie().value(d => d[1]);
    const data_ready = pie(Object.entries(counts));

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius - 10);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    g.selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[0]))
      .attr("stroke", "white")
      .style("stroke-width", "2px");

    g.selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => labelMap[d.data[0]] || d.data[0])
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px");

  }, [data, selectedColumn]);

  return <svg ref={svgRef}></svg>;
}
export default PieChart;