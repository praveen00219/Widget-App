import { X } from 'lucide-react'
import { useDashboardStore } from '../store/dashboard'
import type { Widget } from '../store/dashboard'
import { Donut } from './charts/Donut'
import { SeverityBars } from './charts/SeverityBarsSimple'

export function WidgetCard({ categoryId, widget }: { categoryId: string; widget: Widget }) {
  const removeWidget = useDashboardStore((s) => s.removeWidget)
  return (
    <div className="relative rounded-xl shadow-soft bg-card h-50 p-4">
      <button
        aria-label="Remove widget"
        className="absolute right-2 top-2 h-7 w-7 grid place-items-center rounded-md hover:bg-black/5"
        onClick={() => removeWidget(categoryId, widget.id)}
      >
        <X size={16} />
      </button>
      <div className="text-sm font-medium">{widget.name}</div>
      <div className="mt-2 text-sm text-muted">{widget.description}</div>
      <div className="mt-4">
        {widget.chart?.type === 'donut' && (
          <Donut totalLabel="Total" center={42} slices={[{ name: 'A', value: 20, color: '#4F46E5' }, { name: 'B', value: 22, color: '#93C5FD' }]} />
        )}
        {widget.chart?.type === 'bars' && (
          <SeverityBars totalLabel="Total" bars={[{ name: 'Critical', value: 4, color: '#B91C1C' }, { name: 'High', value: 6, color: '#DC2626' }, { name: 'Medium', value: 10, color: '#F59E0B' }, { name: 'Low', value: 20, color: '#10B981' }]} />
        )}
        {widget.name === 'Cloud Accounts' && (
          <Donut
            totalLabel="Total"
            center={2}
            slices={[
              { name: 'Connected (2)', value: 2, color: '#4F46E5' },
              { name: 'Not Connected (2)', value: 2, color: '#93C5FD' },
            ]}
          />
        )}
        {widget.name === 'Cloud Account Risk Assessment' && (
          <Donut
            totalLabel="Total"
            center={9659}
            slices={[
              { name: 'Failed (1689)', value: 1689, color: '#EF4444' },
              { name: 'Warning (681)', value: 681, color: '#F59E0B' },
              { name: 'Not available (36)', value: 36, color: '#9CA3AF' },
              { name: 'Passed (7253)', value: 7253, color: '#22C55E' },
            ]}
          />
        )}
        {widget.name === 'Image Risk Assessment' && (
          <SeverityBars
            totalLabel="Total Vulnerabilities"
            bars={[
              { name: 'Critical', value: 9, color: '#B91C1C' },
              { name: 'High', value: 150, color: '#DC2626' },
              { name: 'Medium', value: 300, color: '#F59E0B' },
              { name: 'Low', value: 400, color: '#10B981' },
            ]}
          />
        )}
        {widget.name === 'Image Security Issues' && (
          <SeverityBars
            totalLabel="Total Images"
            bars={[
              { name: 'Critical', value: 2, color: '#B91C1C' },
              { name: 'High', value: 6, color: '#DC2626' },
              { name: 'Medium', value: 10, color: '#F59E0B' },
              { name: 'Low', value: 20, color: '#10B981' },
            ]}
          />
        )}
        {!(
          widget.name === 'Cloud Accounts' ||
          widget.name === 'Cloud Account Risk Assessment' ||
          widget.name === 'Image Risk Assessment' ||
          widget.name === 'Image Security Issues'
        ) && !widget.chart && (
          <div className="h-24 grid place-items-center text-muted">No Graph data available</div>
        )}
      </div>
    </div>
  )
}


