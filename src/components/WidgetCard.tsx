import { X } from 'lucide-react'
import { useDashboardStore } from '../store/dashboard'
import type { Widget } from '../store/dashboard'

export function WidgetCard({ categoryId, widget }: { categoryId: string; widget: Widget }) {
  const removeWidget = useDashboardStore((s) => s.removeWidget)
  return (
    <div className="relative rounded-xl shadow-soft bg-card h-40 p-4">
      <button
        aria-label="Remove widget"
        className="absolute right-2 top-2 h-7 w-7 grid place-items-center rounded-md hover:bg-black/5"
        onClick={() => removeWidget(categoryId, widget.id)}
      >
        <X size={16} />
      </button>
      <div className="text-sm font-medium">{widget.name}</div>
      <div className="mt-2 text-sm text-muted">{widget.description}</div>
      <div className="mt-6 h-[2px] bg-black/5" />
      <div className="mt-4 text-center text-muted">No Graph data available</div>
    </div>
  )
}


