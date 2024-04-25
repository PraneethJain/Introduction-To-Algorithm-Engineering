"use client";
import { TimeDatas } from "@/lib";
import * as d3 from "d3";
import { FC, useEffect } from "react";

interface LineChartProps {
  graphTimes: TimeDatas;
}

const LineChart: FC<LineChartProps> = ({ graphTimes }) => {
  useEffect(() => {
    // actual dimensions
    const chartWidth = parseFloat(d3.select("#linechart").style("width"));
    const chartHeight = parseFloat(d3.select("#linechart").style("height"));

    // declare margins and inner dimensions
    const margin = { top: 10, right: 10, bottom: 20, left: 20 };
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;

    // x and y scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(graphTimes.density) as Iterable<d3.NumberValue>)
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain(
        d3.extent([
          ...graphTimes.tarjanTime,
          ...graphTimes.schmidtCheckTime,
          ...graphTimes.schmidtFindTime,
          ...graphTimes.schmidtTime,
        ]) as Iterable<d3.NumberValue>
      )
      .range([height, 0]);

    // set up svg
    const svg = d3.select("#linechart");
    svg.selectAll("*").remove();
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // define and render axes
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);
    g.append("g")
      .attr("transform", `translate(${margin.left},${height})`)
      .call(xAxis);
    g.append("g").attr("transform", `translate(${margin.left},0)`).call(yAxis);

    const lineGenerator = d3
      .line<number>()
      .x((_, i) => xScale(graphTimes.density[i]))
      .y(yScale);

    // transition
    const transition = d3.transition().ease(d3.easeSin).duration(2000);

    // append paths
    const appendPath = (times: number[], color: string) => {
      let path = g
        .append("path")
        .datum(times)
        .attr("stroke", color)
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", lineGenerator)
        .attr("transform", `translate(${margin.left},0)`);
      let length = path.node()!.getTotalLength();
      path
        .attr("stroke-dashoffset", length)
        .attr("stroke-dasharray", length)
        .transition(transition)
        .attr("stroke-dashoffset", 0);
      g.selectAll("dots")
        .data(times)
        .enter()
        .append("circle")
        .attr("cx", (_, i) => xScale(graphTimes.density[i]) + margin.left)
        .attr("cy", yScale)
        .attr("r", 3)
        .attr("fill", color);
    };
    appendPath(graphTimes.tarjanTime, "black");
    appendPath(graphTimes.schmidtCheckTime, "red");
    appendPath(graphTimes.schmidtFindTime, "blue");
    appendPath(graphTimes.schmidtTime, "green");
  }, [graphTimes]);
  return <svg height={"80vh"} width={"80vw"} id="linechart"></svg>;
};

export { LineChart };
