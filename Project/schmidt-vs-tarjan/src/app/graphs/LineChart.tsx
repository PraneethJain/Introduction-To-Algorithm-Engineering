"use client";
import { TimeData } from "@/lib";
import { time } from "console";
import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

interface LineChartProps {
  graphTimes: TimeData[];
}

type timeType = { time: number };

// function lineGeneratorFunction(
//   graphDensities: number[],
//   dataType: keyof typeof Number,
//   graphTimes: TimeData[],
//   xScale: Function,
//   yScale: Function
// ) {
//   return d3
//     .line<TimeData>()
//     .x((d, i) =>
//       xScale(graphDensities[i]).y((d: TimeData) => yScale(d[dataType]))
//     );
// }

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
    const margin = { top: 10, right: 10, bottom: 10, left: 20 };
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

    // append paths
    let tarjanPath = g
      .append("path")
      .datum<timeType[]>(tarjanTimes)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("d", lineGenerator)
      .attr("transform", `translate(${margin.left},0)`);
    let schmidtCheckPath = g
      .append("path")
      .datum<timeType[]>(schmidtCheckTimes)
      .attr("stroke", "red")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("d", lineGenerator)
      .attr("transform", `translate(${margin.left},0)`);
    let schmidtFindPath = g
      .append("path")
      .datum<timeType[]>(schmidtFindTimes)
      .attr("stroke", "blue")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("d", lineGenerator)
      .attr("transform", `translate(${margin.left},0)`);
    let schmidtPath = g
      .append("path")
      .datum<timeType[]>(schmidtTimes)
      .attr("stroke", "green")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("d", lineGenerator)
      .attr("transform", `translate(${margin.left},0)`);
  }, [graphTimes]);
  return <svg height={"80vh"} width={"80vw"} id="linechart"></svg>;
};
