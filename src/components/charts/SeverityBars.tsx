export function SeverityBars({ totalLabel, bars }: { totalLabel: string; bars: { name: string; value: number; color: string }[] }) {
  const total = bars.reduce((a, b) => a + b.value, 0)
  return (
    <div>
      <div className="text-[13px] mb-1">{total} {totalLabel}</div>
      <div className="h-3 w-full rounded-full overflow-hidden bg-black/10">
        <div className="h-full flex">
          {bars.map((b, i) => (
            <div key={i} style={{ width: `${(b.value / total) * 100}%`, background: b.color }} />
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-4 text-[12px]">
        {bars.map((b) => (
          <div key={b.name} className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: b.color }} />
            {b.name} ({b.value})
          </div>
        ))}
      </div>
    </div>
  )
}

type Bar = { name: string; value: number; color: string }

export function SeverityBars({ bars, totalLabel }: { bars: Bar[]; totalLabel?: string }) {
  const total = bars.reduce((a, b) => a + b.value, 0)
  return (
    <div>
      {totalLabel && (
        <div className="text-sm font-medium mb-2">
          {total} <span className="text-muted">{totalLabel}</span>
        </div>
      )}
      <div className="h-3 rounded-full bg-black/10 overflow-hidden">
        <div className="flex h-full">
          {bars.map((b, i) => (
            <div
              key={i}
              title={`${b.name} (${b.value})`}
              style={{ width: `${(b.value / Math.max(1, total)) * 100}%`, background: b.color }}
            />
          ))}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
        {bars.map((b, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: b.color }} />
            {b.name} ({b.value})
          </div>
        ))}
      </div>
    </div>
  )
}


