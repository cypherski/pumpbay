// src/components/shared/Charts/LineChart.tsx
import { Line } from 'recharts'
import { ResponsiveContainer, LineChart as RechartsLineChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface LineChartProps {
  data: Array<{
    timestamp: string
    value: number
  }>
  height?: number
  color?: string
}

export function LineChart({ data, height = 300, color = '#0ea5e9' }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="timestamp"
          stroke="#9CA3AF"
          tick={{ fill: '#9CA3AF' }}
        />
        <YAxis
          stroke="#9CA3AF"
          tick={{ fill: '#9CA3AF' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: 'none',
            borderRadius: '0.375rem',
            color: '#F9FAFB'
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}