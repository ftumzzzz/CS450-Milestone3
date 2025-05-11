import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function TreeDiagram() {
  const svgRef = useRef();
  useEffect(() => {
    const data = {
      name: "Heart Attack Risk",
      children:[
        {
          name: "Smoker",
          children: [
            {
              name: "Poor Diet",
              children: [{ name: "Higher Risk" }]
            },
            {
              name: "No Exercise",
              children: [{ name: "Higher Risk" }]
            }
          ]
        },
        {
          name: "Non-Smoker",
          children:[
            {
              name: "Good Diet",
              children:[{ name:"Lower Risk" }]
            },
            {
              name: "Regular Exercise",
              children:[{ name: "Lower Risk" }]
            }
          ]
        }
      ]
    };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const width = 600;
    const height = 500;
    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().nodeSize([70, 60]);
    treeLayout(root);

    const nodes = root.descendants();
    const minX = d3.min(nodes, d => d.x);
    const maxX = d3.max(nodes, d => d.x);
    const offsetX = (width - (maxX - minX)) / 2 - minX;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .style("max-width", "100%")
      .style("height", "auto")
      .style("display", "block")
      .style("margin", "0 auto")
      .append("g")
      .attr("transform", `translate(${offsetX}, 40)`);

    g.selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke", "#999");

    g.selectAll("rect")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("x", d => d.x - 50)
      .attr("y", d => d.y - 20)
      .attr("width", 100)
      .attr("height", 40)
      .attr("fill", "#66b3ff")
      .attr("stroke", "#333")
      .attr("rx", 6);

    g.selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y + 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#000")
      .text(d => d.data.name);
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default TreeDiagram;
