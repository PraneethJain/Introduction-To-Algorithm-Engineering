import { useMemo } from "react";
import * as d3 from "d3";
import { curveCatmullRom } from "d3";

const MARGIN = { top: 30, right: 120, bottom: 50, left: 50 };

type StreamChartProps = {
  width: number;
  height: number;
  data: { [key: string]: number }[];
  labelColors: { [key: string]: string };
  xLabel: string;
};

const StreamChart = ({
  width,
  height,
  data,
  labelColors,
  xLabel,
}: StreamChartProps) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const groups = Object.keys(data[0]).filter((key) => key !== "x");

  const stackSeries = d3
    .stack()
    .keys(groups)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetSilhouette);

  const series = stackSeries(data);

  const topYValues = series.flatMap((s) => s.map((d) => d[1]));
  const yMax = Math.max(...topYValues);
  const bottomYValues = series.flatMap((s) => s.map((d) => d[0]));
  const yMin = Math.min(...bottomYValues);

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([yMin, yMax]).range([boundsHeight, 0]);
  }, [boundsHeight, yMin, yMax]);

  const [xMin, xMax] = d3.extent(data, (d) => d.x);
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([xMin || 0, xMax || 0])
      .range([0, boundsWidth]);
  }, [boundsWidth, xMin, xMax]);

  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(groups)
    .range(Object.values(labelColors));

  const areaBuilder = d3
    .area<any>()
    .x((d) => {
      return xScale(d.data.x);
    })
    .y1((d) => yScale(d[1]))
    .y0((d) => yScale(d[0]))
    .curve(curveCatmullRom);

  const allPath = series.map((serie, i) => {
    const path = areaBuilder(serie);
    return (
      <path
        key={i}
        className="shape"
        d={path!}
        opacity={1}
        stroke="grey"
        fill={colorScale(serie.key)}
        fillOpacity={0.8}
        cursor="pointer"
      />
    );
  });

  const labels = groups.map((group, i) => (
    <text
      key={i}
      x={boundsWidth + group.length * 7}
      y={yScale(series[i][series[i].length - 1][1])}
      textAnchor="end"
      alignmentBaseline="middle"
      fontSize={12}
      fill={colorScale(group)}
    >
      {group}
    </text>
  ));

  const grid = xScale.ticks(5).map((value, i) => (
    <g key={i}>
      <line
        x1={xScale(value)}
        x2={xScale(value)}
        y1={0}
        y2={boundsHeight}
        stroke="#808080"
        opacity={0.2}
      />
      <text
        x={xScale(value)}
        y={boundsHeight + 10}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={9}
        stroke="#808080"
        opacity={0.8}
      >
        {value}
      </text>
    </g>
  ));

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {grid}
          <g className="container">{allPath}</g>
          <g>{labels}</g>
          <text
            x={boundsWidth / 2}
            y={boundsHeight + MARGIN.bottom - 10}
            textAnchor="middle"
            fontSize={14}
            fill="white"
          >
            {xLabel}
          </text>
        </g>
      </svg>
    </div>
  );
};

export { StreamChart };
