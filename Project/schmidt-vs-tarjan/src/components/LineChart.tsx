"use client";
import { TimeDatas } from "@/lib";
import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

interface LineChartProps {
  graphTimes: TimeDatas;
  xLabel: string;
  labelColors: { [key: string]: string };
}

const LineChart: FC<LineChartProps> = ({ graphTimes, xLabel, labelColors }) => {
  const chartRef = useRef(null);
  const legendRef = useRef(null);

  useEffect(() => {
    const chartWidth = parseFloat(d3.select(chartRef.current).style("width"));
    const chartHeight = parseFloat(d3.select(chartRef.current).style("height"));

    const margin = { top: 10, right: 60, bottom: 45, left: 40 };
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;

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

    const chart = d3.select(chartRef.current);
    chart.selectAll("*").remove();
    const g = chart
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);
    g.append("g")
      .attr("transform", `translate(${margin.left},${height})`)
      .call(xAxis);
    g.append("g").attr("transform", `translate(${margin.left},0)`).call(yAxis);

    g.append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 30)
      .text(xLabel);

    // Add y-axis label
    g.append("text")
      .attr("class", "y-axis-label")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 30)
      .attr("transform", "rotate(-90)")
      .text("Time (ms)");

    const lineGenerator = d3
      .line<number>()
      .x((_, i) => xScale(graphTimes.xData[i]))
      .y(yScale);

    const transition = d3.transition().ease(d3.easeSin).duration(2000);

    let tooltip = d3.select(".tooltip");

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
        .on("mouseover", function () {
          tooltip.style("display", "block");
          d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "white")
            .style("stroke-width", "2px");
        })
        .on("mousemove", function (event, d) {
          const idx = times.indexOf(d);
          let xTooltip = "";
          switch (xLabel) {
            case "Density (%)":
              xTooltip = `<br/>Density: ${graphTimes.xData[idx]}`;
              break;
            case "Vertices":
              xTooltip = "";
              break;
            case "Bridge (1e4)":
              xTooltip = `<br/>No of bridges: ${graphTimes.xData[idx] * 10000}`;
              break;
          }
          tooltip
            .html(
              "Vertices: " +
                graphTimes.n[idx] +
                "<br>Edges: " +
                graphTimes.m[idx] +
                `${xTooltip}` +
                "<br>Time: " +
                Math.round(times[idx])
            )
            .style("position", "absolute")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 10}px`)
            .style("color", color);
        })
        .on("mouseleave", function () {
          tooltip.style("display", "none");
          d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "white")
            .style("stroke-width", "0px");
        });
    };

    appendPath(graphTimes.tarjanTime, labelColors["TarjanTime"]);
    appendPath(graphTimes.schmidtCheckTime, labelColors["Schmidt Check Time"]);
    appendPath(graphTimes.schmidtFindTime, labelColors["Schmidt Find Time"]);
    appendPath(graphTimes.schmidtTime, labelColors["Schmidt Time"]);

    const legend = d3.select(legendRef.current);
    const gLegend = legend.append("g");
    gLegend
      .selectAll("lines")
      .data(Object.values(labelColors))
      .enter()
      .append("path")
      .attr("stroke", (d) => d)
      .attr("stroke-width", 3)
      .attr("d", function (_, i) {
        return `M20 ${
          parseFloat(d3.select(legendRef.current).style("height")) * 0.175 * i +
          30
        } L${20 + parseFloat(d3.select(legendRef.current).style("width")) * 0.3} ${parseFloat(d3.select(legendRef.current).style("height")) * 0.175 * i + 30}`;
      });
    gLegend
      .selectAll("dots")
      .data(Object.values(labelColors))
      .enter()
      .append("circle")
      .attr(
        "cx",
        20 + parseFloat(d3.select(legendRef.current).style("width")) * 0.15
      )
      .attr("cy", function (_, i) {
        return (
          parseFloat(d3.select(legendRef.current).style("height")) * 0.175 * i +
          30
        );
      })
      .attr("r", 6)
      .attr("fill", function (d) {
        return d;
      });
    gLegend
      .selectAll("labels")
      .data(Object.keys(labelColors))
      .enter()
      .append("text")
      .attr(
        "x",
        20 + parseFloat(d3.select(legendRef.current).style("width")) * 0.35
      )
      .attr("y", function (_, i) {
        return (
          parseFloat(d3.select(legendRef.current).style("height")) * 0.175 * i +
          32.5
        );
      })
      .attr("font-size", "0.8vw")
      .text((d) => d);
  }, [graphTimes, xLabel, labelColors]);

  return (
    <div className="my-8 w-3/4">
      <div className="flex mt-8 justify-evenly">
        <svg
          height="50vh"
          width="40vw"
          ref={chartRef}
          className="fill-white"
        ></svg>
        <svg
          height="20vh"
          width="15vw"
          ref={legendRef}
          className="border-white border-2 rounded-xl fill-white"
        ></svg>
        <div className="tooltip bg-black border-white border-2 rounded-l p-2 hidden"></div>
      </div>
    </div>
  );
};

export { LineChart };
