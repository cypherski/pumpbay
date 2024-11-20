// src/components/shared/Charts/PieChart.tsx
import { Pie, Cell } from 'recharts'
import { ResponsiveContainer, PieChart as RechartsPieChart, Tooltip, Legend } from 'recharts'

interface PieChartProps {
  data: Array<{
    name: string
    value: number
  }>
  height?: number
  colors?: string[]
}

export function PieChart({ 
    data, 
    height = 300,
    colors = ['#0ea5e9', '#6366f1', '#ec4899', '#f59e0b', '#10b981']
  }: PieChartProps) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                >
                  {`${value}%`}
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '0.375rem',
              color: '#F9FAFB'
            }}
          />
          <Legend 
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span style={{ color: '#9CA3AF' }}>{value}</span>}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    )
  }