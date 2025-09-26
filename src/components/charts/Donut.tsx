import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

type Slice = { name: string; value: number; color: string }

export function Donut({ totalLabel, center, slices }: { totalLabel: string; center: number; slices: Slice[] }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie data={slices} dataKey="value" innerRadius={40} outerRadius={55} paddingAngle={2}>
              {slices.map((e, i) => (
                <Cell key={i} fill={e.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-lg font-semibold leading-5">{center}</div>
            <div className="text-[11px] text-muted">{totalLabel}</div>
          </div>
        </div>
      </div>
      <ul className="space-y-1 text-[12px]">
        {slices.map((s) => (
          <li key={s.name} className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            {s.name}
                </li>
              ))}
            </ul>
    </div>
  )
}

 


