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

import { Pie, PieChart, Cell, Legend, ResponsiveContainer } from 'recharts'

type Slice = { name: string; value: number; color: string }

export function Donut({ totalLabel, center, slices }: { totalLabel: string; center: number; slices: Slice[] }) {
  return (
    <div className="h-40 flex items-center">
      <ResponsiveContainer width="50%" height="100%">
        <PieChart>
          <Pie data={slices} dataKey="value" innerRadius={42} outerRadius={60} paddingAngle={2}>
            {slices.map((s, i) => (
              <Cell key={i} fill={s.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="relative -ml-28 text-center">
        <div className="text-2xl font-semibold">{center}</div>
        <div className="text-xs text-muted">{totalLabel}</div>
      </div>
      <div className="ml-6">
        <Legend
          verticalAlign="middle"
          align="left"
          payload={slices.map((s) => ({ value: s.name, type: 'circle', color: s.color }))}
          content={(props: any) => (
            <ul className="space-y-1">
              {props.payload.map((p: any, idx: number) => (
                <li key={idx} className="flex items-center gap-2 text-xs">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: p.color }} />
                  {p.value}
                </li>
              ))}
            </ul>
          )}
        />
      </div>
    </div>
  )
}


