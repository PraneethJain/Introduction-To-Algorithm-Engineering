"use client";
import { TimeDatas } from "@/lib";
import * as d3 from "d3";
import { FC, useEffect } from "react";

interface LineChartProps {
  graphTimes: TimeDatas;
}

const LineChart: FC<LineChartProps> = ({ graphTimes }) => {
  useEffect(() => {
    // line colors and labels
    const colors = ["black", "red", "blue", "green"];
    const labels = [
      "Tarjan Time",
      "Schmidt Check Time",
      "Schmidt Find Time",
      "Schmidt Time",
    ];

    // actual dimensions
    const chartWidth = parseFloat(d3.select("#linechart").style("width"));
    const chartHeight = parseFloat(d3.select("#linechart").style("height"));

    // declare margins and inner dimensions
    const margin = { top: 10, right: 30, bottom: 20, left: 20 };
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;

    // x and y scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(graphTimes.xData) as Iterable<d3.NumberValue>)
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
    const chart = d3.select("#linechart");
    chart.selectAll("*").remove();
    const g = chart
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // define and render axes
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);
    g.append("g")
      .attr("transform", `translate(${margin.left},${height})`)
      .call(xAxis);
    g.append("g").attr("transform", `translate(${margin.left},0)`).call(yAxis);

    // line generator
    const lineGenerator = d3
      .line<number>()
      .x((_, i) => xScale(graphTimes.xData[i]))
      .y(yScale);

    // transition
    const transition = d3.transition().ease(d3.easeSin).duration(2000);

    // tooltip
    let tooltip = d3.select("body").append("div").attr("class", "tooltip");

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
        .attr("cx", (_, i) => xScale(graphTimes.xData[i]) + margin.left)
        .attr("cy", yScale)
        .attr("r", 3)
        .attr("fill", color)
        .on("mouseover", function (event, d) {
          tooltip.style("display", "block");
          d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "black")
            .style("stroke-width", "3px");
        })
        .on("mousemove", function (event, d) {
          let idx = times.indexOf(d);
          tooltip
            .html(
              "Vertices: " +
                graphTimes.n[idx] +
                "<br>Edges: " +
                graphTimes.m[idx] +
                "<br>Density: " +
                graphTimes.xData[idx] +
                "<br>Time: " +
                Math.round(times[idx])
            )
            .style("position", "absolute")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 10}px`)
            .style("background-color", "pink")
            .style("border-radius", "0.5vw");
        })
        .on("mouseleave", function (event) {
          tooltip.style("display", "none");
          d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "black")
            .style("stroke-width", "0px");
        });
    };
    appendPath(graphTimes.tarjanTime, colors[0]);
    appendPath(graphTimes.schmidtCheckTime, colors[1]);
    appendPath(graphTimes.schmidtFindTime, colors[2]);
    appendPath(graphTimes.schmidtTime, colors[3]);

    // legend
    const legend = d3.select("#legend");
    const gLegend = legend.append("g");
    gLegend
      .selectAll("lines")
      .data(colors)
      .enter()
      .append("path")
      .attr("stroke", function (d) {
        return d;
      })
      .attr("stroke-width", 3)
      .attr("d", function (_, i) {
        return `M20 ${
          40 * i + 30
        } L${20 + parseFloat(d3.select("#legend").style("width")) * 0.3} ${40 * i + 30}`;
      });
    gLegend
      .selectAll("dots")
      .data(colors)
      .enter()
      .append("circle")
      .attr("cx", 20 + parseFloat(d3.select("#legend").style("width")) * 0.15)
      .attr("cy", function (_, i) {
        return 40 * i + 30;
      })
      .attr("r", 6)
      .attr("fill", function (d) {
        return d;
      });
    gLegend
      .selectAll("labels")
      .data(labels)
      .enter()
      .append("text")
      .attr("x", 20 + parseFloat(d3.select("#legend").style("width")) * 0.35)
      .attr("y", function (_, i) {
        return 40 * i + 32.5;
      })
      .attr("font-size", "1.2vw")
      .text(function (d) {
        return d;
      });
  }, [graphTimes]);

  return (
    <div className="flex mt-8">
      <svg
        height={"80vh"}
        width={"60vw"}
        id="linechart"
        className="mr-16"
      ></svg>
      <svg
        height={"30vh"}
        width={"30vw"}
        id="legend"
        className="border-black border-2 rounded-xl"
      ></svg>
    </div>
  );
};

export { LineChart };
