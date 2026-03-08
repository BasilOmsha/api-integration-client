import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

import type { CachedDataPointReadDto } from '../../types/fingrid.ts'

interface ChartProps {
  dataPoints: CachedDataPointReadDto[]
  unit: string
}

// Isolated component — swap Recharts for Three.js/WebGL here later
export const Chart = ({ dataPoints, unit }: ChartProps) => {
  const chartData = dataPoints.map(point => ({
    time: new Date(point.startTime).toLocaleString(),
    value: point.value
  }))

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11 }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11 }}
            label={{ value: unit, angle: -90, position: 'insideLeft', fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => value !== undefined ? [`${value} ${unit}`, 'Value'] : null}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}