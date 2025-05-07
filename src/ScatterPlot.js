import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function ScatterPlot({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    // Filter out invalid data
    const filtered = data.filter(
      d => !isNaN(d.sleep_hours) && !isNaN(d.stress_level)
    );

    // Scales
    const x = d3.scaleLinear()
      .domain([0, d3.max(filtered, d => d.sleep_hours) || 10])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filtered, d => d.stress_level) || 10])
      .range([height - margin.bottom, margin.top]);

    svg.attr("width", width).attr("height", height);

    // Axes
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // Axis labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Hours of Sleep");

    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Stress Level");

    // Dots
    svg.selectAll("circle")
      .data(filtered)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.sleep_hours))
      .attr("cy", d => y(d.stress_level))
      .attr("r", 5)
      .attr("fill", "#4682b4");

  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default ScatterPlot;
