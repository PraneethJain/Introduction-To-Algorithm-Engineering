"use client";
import { TimeData } from "@/lib";
import { time } from "console";
import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

interface LineChartProps {
  graphTimes: TimeData[];
}

type timeType = { time: number };

export const LineChart: FC<LineChartProps> = ({ graphTimes }) => {
  useEffect(() => {
    // get the array for densities
    let graphDensities: number[] = [];
    for (let i = 0; i < graphTimes.length; ++i) {
      let curData = graphTimes[i];
      graphDensities.push((curData.m * 100) / (curData.n * (curData.n - 1)));
    }

    // get time arrays
    let tarjanTimes: timeType[] = [],
      schmidtCheckTimes: timeType[] = [],
      schmidtFindTimes: timeType[] = [],
      schmidtTimes: timeType[] = [],
      allTimes: timeType[] = [];
    for (let i = 0; i < graphTimes.length; ++i) {
      let curData = graphTimes[i];
      tarjanTimes.push({ time: curData.tarjanTime });
      schmidtCheckTimes.push({ time: curData.schmidtCheckTime });
      schmidtFindTimes.push({ time: curData.schmidtFindTime });
      schmidtTimes.push({ time: curData.schmidtTime });
    }

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
      .domain(d3.extent(graphDensities, (d) => d) as Iterable<d3.NumberValue>)
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain(
        d3.extent(
          [
            ...tarjanTimes,
            ...schmidtCheckTimes,
            ...schmidtFindTimes,
            ...schmidtTimes,
          ],
          (d) => d.time
        ) as Iterable<d3.NumberValue>
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
      .line<timeType>()
      .x((d: timeType, i) => xScale(graphDensities[i]))
      .y((d: timeType) => yScale(d.time));

    // transition
    const transition = d3.transition().ease(d3.easeSin).duration(2000);

    // append paths
    let tarjanPath = g
      .append("path")
      .datum<timeType[]>(tarjanTimes)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("d", lineGenerator)
      .attr("transform", `translate(${margin.left},0)`);
    let tarjanLength = tarjanPath.node()?.getTotalLength();
    tarjanPath
      .attr("stroke-dashoffset", tarjanLength as number)
      .attr("stroke-dasharray", tarjanLength as number)
      .transition(transition)
      .attr("stroke-dashoffset", 0);
    g.selectAll("dots")
      .data(tarjanTimes)
      .enter()
      .append("circle")
      .attr("cx", function (d, i) {
        return xScale(graphDensities[i]) + margin.left;
      })
      .attr("cy", function (d) {
        return yScale(d.time);
      })
      .attr("r", 3)
      .attr("fill", "black");
    let schmidtCheckPath = g
      .append("path")
      .datum<timeType[]>(schmidtCheckTimes)
      .attr("stroke", "red")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("d", lineGenerator)
      .attr("transform", `translate(${margin.left},0)`);
    let schmidtCheckLength = schmidtCheckPath.node()?.getTotalLength();
    schmidtCheckPath
      .attr("stroke-dashoffset", schmidtCheckLength as number)
      .attr("stroke-dasharray", schmidtCheckLength as number)
      .transition(transition)
      .attr("stroke-dashoffset", 0);
    g.selectAll("dots")
      .data(schmidtCheckTimes)
      .enter()
      .append("circle")
      .attr("cx", function (d, i) {
        return xScale(graphDensities[i]) + margin.left;
      })
      .attr("cy", function (d) {
        return yScale(d.time);
      })
      .attr("r", 3)
      .attr("fill", "red");
    let schmidtFindPath = g
      .append("path")
      .datum<timeType[]>(schmidtFindTimes)
      .attr("stroke", "blue")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("d", lineGenerator)
      .attr("transform", `translate(${margin.left},0)`);
    let schmidtFindLength = schmidtFindPath.node()?.getTotalLength();
    schmidtFindPath
      .attr("stroke-dashoffset", schmidtFindLength as number)
      .attr("stroke-dasharray", schmidtFindLength as number)
      .transition(transition)
      .attr("stroke-dashoffset", 0);
    g.selectAll("dots")
      .data(schmidtFindTimes)
      .enter()
      .append("circle")
      .attr("cx", function (d, i) {
        return xScale(graphDensities[i]) + margin.left;
      })
      .attr("cy", function (d) {
        return yScale(d.time);
      })
      .attr("r", 3)
      .attr("fill", "blue");
    let schmidtPath = g
      .append("path")
      .datum<timeType[]>(schmidtTimes)
      .attr("stroke", "green")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("d", lineGenerator)
      .attr("transform", `translate(${margin.left},0)`);
    let schmidtLength = schmidtPath.node()?.getTotalLength();
    schmidtPath
      .attr("stroke-dashoffset", schmidtLength as number)
      .attr("stroke-dasharray", schmidtLength as number)
      .transition(transition)
      .attr("stroke-dashoffset", 0);
    g.selectAll("dots")
      .data(schmidtTimes)
      .enter()
      .append("circle")
      .attr("cx", function (d, i) {
        return xScale(graphDensities[i]) + margin.left;
      })
      .attr("cy", function (d) {
        return yScale(d.time);
      })
      .attr("r", 3)
      .attr("fill", "green");
  }, [graphTimes]);
  return <svg height={"80vh"} width={"80vw"} id="linechart"></svg>;
};