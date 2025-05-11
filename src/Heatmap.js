import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function Heatmap({ data, xVar, yVar }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };

    // Filter data
    const filtered = data.filter(d => d[xVar] !== null && d[yVar] !== null);

    // Get sorted unique values for axes
    const xValues = Array.from(new Set(filtered.map(d => d[xVar]))).sort();
    const yValues = Array.from(new Set(filtered.map(d => d[yVar]))).sort();

    // Group and count data
    const grouped = d3.rollups(
      filtered,
      v => v.length,
      d => d[yVar],
      d => d[xVar]
    );

    const gridData = [];
    grouped.forEach(([yVal, inner]) => {
      inner.forEach(([xVal, count]) => {
        gridData.push({ x: xVal, y: yVal, value: count });
      });
    });

    // Scales
    const xScale = d3.scaleBand()
      .domain(xValues)
      .range([margin.left, width - margin.right])
      .padding(0.05);

    const yScale = d3.scaleBand()
      .domain(yValues)
      .range([margin.top, height - margin.bottom])
      .padding(0.05);

    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolatePurples)
      .domain([0, d3.max(gridData, d => d.value)]);

    svg.attr("width", width).attr("height", height);
    // Title
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 1.5)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .text(`${yVar} vs ${xVar} Heatmap`);


    // Draw rectangles
    svg.selectAll("rect")
      .data(gridData)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.x))
      .attr("y", d => yScale(d.y))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", d => colorScale(d.value));

    // Axes
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(xVar);

    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(yVar);

  }, [data, xVar, yVar]);

  return <svg ref={svgRef}></svg>;
}

export default Heatmap;
