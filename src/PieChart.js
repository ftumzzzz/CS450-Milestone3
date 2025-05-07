import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function PieChart() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
      .domain(["Smoker", "Non-Smoker"])
      .range(["#e41a1c", "#377eb8"]);

    // Fake data for now (replace with actual data if needed)
    const data = { "Smoker": 35, "Non-Smoker": 65 };

    const pie = d3.pie().value(d => d[1]);
    const data_ready = pie(Object.entries(data));

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius - 10);

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

    // Labels
    g.selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => d.data[0])
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px");

  }, []);

  return <svg ref={svgRef}></svg>;
}

export default PieChart;
