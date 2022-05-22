import React, { useCallback, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import './style.scss';

interface ChartProp {
  color: string;
  value: number;
}

const renderActiveShape = props => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g className="pieChart">
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export const Chart: React.FC<ChartProp> = ({ color, value }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  const restPercent = 100 - value;

  const dataPieChart = [
    {
      name: 'Right',
      value: value,
    },
    {
      name: 'Left',
      value: restPercent,
    },
  ];

  return (
    <PieChart width={130} height={130}>
      <text fontWeight={700} fontSize={22} fill="#2c405a" x={65} y={65} textAnchor="middle" dominantBaseline="middle">
        {dataPieChart[0].value + '%'}
      </text>
      <Pie
        startAngle={360}
        endAngle={0}
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={dataPieChart}
        innerRadius={50}
        outerRadius={64}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
        className="pieChart"
      >
        {dataPieChart.map((entry, index) => {
          if (index === 1) {
            return <Cell key={`cell-${index}`} fill="#bdc3c7" />;
          }
          return <Cell key={`cell-${index}`} fill={color} />;
        })}
      </Pie>
    </PieChart>
  );
};

//chart tool tip chart
export const ChartToolTip = React.memo(({ data }: { data?: { name: string; pv: number }[] }) => {
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload?.[0]?.payload?.pv > 0) {
      return (
        <div className="flex flex-col bg-lightBlack text-gray-1 min-w-10 px-10 py-8 rounded-12">
          <p className="label">{`${label}`}</p>
          <div className="flex justify-between items-center">
            <div className="w-8 h-8 bg-blue mr-4"></div>
            <p>{`${payload?.[0].value}`}</p>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        className="BarChart"
        width={500}
        height={300}
        data={data ?? []}
        layout="vertical"
        margin={{
          top: 15,
          right: 25,
          left: -35,
          bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" className="CartesianGrid" />
        <YAxis type="category" dataKey="name" />
        <XAxis type="number" />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        <Bar dataKey="pv" barSize={10} fill="#00b0c7" isAnimationActive={true} />
      </BarChart>
    </ResponsiveContainer>
  );
});
