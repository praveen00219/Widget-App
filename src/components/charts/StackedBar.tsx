import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function StackedBar({ data }: { data: { name: string; critical: number; high: number; medium: number; low: number }[] }) {
  return (
    <div className="h-40 flex items-center">
      <div className="w-full h-32">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="critical" stackId="a" fill="#ef4444" />
            <Bar dataKey="high" stackId="a" fill="#f59e0b" />
            <Bar dataKey="medium" stackId="a" fill="#fbbf24" />
            <Bar dataKey="low" stackId="a" fill="#a3e635" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


