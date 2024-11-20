// src/components/shared/Charts/BarChart.tsx
import { Bar } from 'recharts'
import { ResponsiveContainer, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface BarChartProps {
  data: Array<{
    label: string
    value: number
  }>
  height?: number
  color?: string
}

export function BarChart({ data, height = 300, color = '#0ea5e9' }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="label"
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
        <Bar
          dataKey="value"
          fill={color}
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}