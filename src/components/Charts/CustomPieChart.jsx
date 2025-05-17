import React, { useEffect, useMemo, useCallback } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CustomPieChart = ({ data, colors = [] }) => {
  useEffect(() => {
    console.log('CustomPieChart rendered');
  }, [data, colors]);

  const CustomTooltip = useCallback(({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded-lg border">
          <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  }, []);

  const renderLegend = useCallback(({ payload }) => (
    <ul className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <li key={`legend-${index}`} className="flex items-center">
          <span
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{entry.value}</span>
        </li>
      ))}
    </ul>
  ), []);

  const chartCells = useMemo(() =>
    (data || []).map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={colors[index] || '#8884d8'}
      />
    )), [data, colors]);

  // Now it's safe to conditionally return after all hooks
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available for chart</p>
      </div>
    );
  }

  return (
    // <div className="w-full h-[300px] border rounded-lg p-4">
      <ResponsiveContainer width="100%" height={325}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={120}
            fill="#8884d8"
            labelLine={false}

          >
            {chartCells}
          </Pie>
          <Tooltip content={CustomTooltip} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    // </div>
  );
};

export default CustomPieChart;
