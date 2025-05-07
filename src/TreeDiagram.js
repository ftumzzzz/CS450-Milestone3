import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function TreeDiagram() {
  const svgRef = useRef();

  useEffect(() => {
    const data = {
      name: "Risk Factors",
      children: [
        {
          name: "Smoking",
          children: [
            { name: "Yes → High Risk" },
            { name: "No" }
          ]
        },
        {
          name: "Physical Activity",
          children: [
            { name: "Low → High Risk" },
            { name: "High" }
          ]
        }
      ]
    };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 300;

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([width - 80, height - 80]);
    treeLayout(root);

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40, 40)");

    // Links
    g.selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke", "#999");

    // Nodes
    g.selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 5)
      .attr("fill", "#69b3a2");

    // Labels
    g.selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("x", d => d.x + 8)
      .attr("y", d => d.y + 5)
      .text(d => d.data.name)
      .style("font-size", "12px");
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default TreeDiagram;
