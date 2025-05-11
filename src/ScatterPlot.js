import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function ScatterPlot({ data, xVar, yVar }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select(svgRef.current.parentNode)
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("padding", "4px 8px")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("font-size", "12px");

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const filtered = data.filter(d =>
      !isNaN(d[xVar]) && !isNaN(d[yVar])
    );

    const x = d3.scaleLinear()
      .domain([0, d3.max(filtered, d => d[xVar]) || 10])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filtered, d => d[yVar]) || 10])
      .range([height - margin.bottom, margin.top]);

    svg.attr("width", width).attr("height", height);

    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(xVar.replaceAll("_", " "));

    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(yVar.replaceAll("_", " "));

    svg.selectAll("circle")
      .data(filtered)
      .enter()
      .append("circle")
      .attr("cx", d => x(d[xVar]))
      .attr("cy", d => y(d[yVar]))
      .attr("r", 5)
      .attr("fill", d => d.heart_attack === 1 ? "#e41a1c" : "#377eb8")
      .attr("opacity", 0.7)
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .text(`${xVar}: ${d[xVar]}, ${yVar}: ${d[yVar]}, Heart Attack: ${d.heart_attack ? "Yes" : "No"}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY - 30}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });


  }, [data, xVar, yVar]);



  return <svg ref={svgRef}></svg>;
}


export default ScatterPlot;
