"use client";
import { TimeData } from "@/lib";
import * as d3 from "d3";
import { FC, useEffect } from "react";

interface LineChartProps {
  graphTimes: TimeData[];
}

type timeType = { time: number };

const LineChart: FC<LineChartProps> = ({ graphTimes }) => {
  useEffect(() => {
    // get the array for densities
    let graphDensities: number[] = [];
    for (let i = 0; i < graphTimes.length; ++i) {
      let curData = graphTimes[i];
      graphDensities.push((curData.m * 200) / (curData.n * (curData.n - 1)));
    }

    // get time arrays
    let tarjanTimes: timeType[] = [],
      schmidtCheckTimes: timeType[] = [],
      schmidtFindTimes: timeType[] = [],
      schmidtTimes: timeType[] = [];
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
      .x((_, i) => xScale(graphDensities[i]))
      .y((d: timeType) => yScale(d.time));

    // transition
    const transition = d3.transition().ease(d3.easeSin).duration(2000);

    const appendPath = (times: timeType[], color: string) => {
      let path = g
        .append("path")
        .datum<timeType[]>(times)
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
        .attr("cx", (_, i) => xScale(graphDensities[i]) + margin.left)
        .attr("cy", (d) => yScale(d.time))
        .attr("r", 3)
        .attr("fill", color);
    };

    // append paths
    appendPath(tarjanTimes, "black");
    appendPath(schmidtCheckTimes, "red");
    appendPath(schmidtFindTimes, "blue");
    appendPath(schmidtTimes, "green");
  }, [graphTimes]);
  return <svg height={"80vh"} width={"80vw"} id="linechart"></svg>;
};

export { LineChart };
