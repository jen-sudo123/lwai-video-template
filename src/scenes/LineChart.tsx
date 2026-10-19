import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts } from '../tokens';
import { LogoFooter } from '../Logo';

export type LineChartDatum = { label: string; value: number };

type LineChartProps = {
  title?: string;
  data?: LineChartDatum[];
};

const DEFAULT_DATA: LineChartDatum[] = [
  { label: 'Jan', value: 25 },
  { label: 'Feb', value: 40 },
  { label: 'Mar', value: 35 },
  { label: 'Apr', value: 55 },
  { label: 'May', value: 50 },
  { label: 'Jun', value: 70 },
  { label: 'Jul', value: 65 },
  { label: 'Aug', value: 80 },
  { label: 'Sep', value: 75 },
  { label: 'Oct', value: 90 },
];

export const LineChart: React.FC<LineChartProps> = ({
  title = 'Revenue Growth',
  data = DEFAULT_DATA,
}) => {
  const frame = useCurrentFrame();

  const chartWidth = 900;
  const chartHeight = 500;
  const padding = 70;
  const maxValue = Math.max(...data.map((d) => d.value), 100);

  const xScale = (i: number) =>
    (i / (data.length - 1)) * (chartWidth - padding * 2) + padding;
  const yScale = (value: number) =>
    chartHeight - padding - (value / maxValue) * (chartHeight - padding * 2);

  const points = data.map((d, i) => `${xScale(i)},${yScale(d.value)}`).join(' ');

  let totalLength = 0;
  for (let i = 1; i < data.length; i++) {
    const dx = xScale(i) - xScale(i - 1);
    const dy = yScale(data[i].value) - yScale(data[i - 1].value);
    totalLength += Math.sqrt(dx * dx + dy * dy);
  }

  const dashOffset = interpolate(frame, [0, 60], [totalLength, 0], {
    extrapolateRight: 'clamp',
  });

  const gridSteps = [0, 25, 50, 75, 100].map((pct) => (pct / 100) * maxValue);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: chartWidth,
          height: chartHeight,
          backgroundColor: colors.white,
          border: `1px solid ${colors.neutral200}`,
          borderRadius: 16,
          padding: 20,
        }}
      >
        <svg width={chartWidth} height={chartHeight}>
          {gridSteps.map((val) => (
            <line
              key={`grid-${val}`}
              x1={padding}
              y1={yScale(val)}
              x2={chartWidth - padding}
              y2={yScale(val)}
              stroke={colors.neutral200}
              strokeWidth="1"
            />
          ))}

          {gridSteps.map((val) => (
            <text
              key={`y-${val}`}
              x={padding - 15}
              y={yScale(val) + 5}
              textAnchor="end"
              fill={colors.neutral600}
              fontFamily={fonts.sans}
              fontSize="12"
            >
              {Math.round(val)}
            </text>
          ))}

          <line
            x1={padding}
            y1={chartHeight - padding}
            x2={chartWidth - padding}
            y2={chartHeight - padding}
            stroke={colors.neutral200}
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={chartHeight - padding}
            stroke={colors.neutral200}
            strokeWidth="2"
          />

          {data.map((d, i) => (
            <text
              key={`x-label-${i}`}
              x={xScale(i)}
              y={chartHeight - padding + 25}
              textAnchor="middle"
              fill={colors.black}
              fontFamily={fonts.sans}
              fontSize="13"
              fontWeight="600"
            >
              {d.label}
            </text>
          ))}

          <polyline
            points={points}
            fill="none"
            stroke={colors.lime500}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLength}
            strokeDashoffset={dashOffset}
          />

          {data.map((d, i) => {
            const pointProgress = interpolate(
              frame,
              [5 + i * 6, 10 + i * 6],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );

            return (
              <circle
                key={`point-${i}`}
                cx={xScale(i)}
                cy={yScale(d.value)}
                r={5 * pointProgress}
                fill={colors.lime500}
                stroke={colors.white}
                strokeWidth="2"
                opacity={pointProgress}
              />
            );
          })}
        </svg>

        <div
          style={{
            position: 'absolute',
            top: 25,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 28,
            fontFamily: fonts.serif,
            fontWeight: 400,
            letterSpacing: '-0.04em',
            color: colors.black,
          }}
        >
          {title}
        </div>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};

export default LineChart;
