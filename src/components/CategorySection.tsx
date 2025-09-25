import { Plus } from 'lucide-react'
import { useDashboardStore } from '../store/dashboard'
import { WidgetCard } from './WidgetCard'

export function CategorySection({ id, onAdd }: { id: string; onAdd?: (categoryId: string) => void }) {
  const category = useDashboardStore((s) => s.categories.find((c) => c.id === id)!)
  const search = useDashboardStore((s) => s.searchQuery)

  const widgets = !search
    ? category.widgets
    : category.widgets.filter((w) =>
        `${w.name} ${w.description}`.toLowerCase().includes(search.toLowerCase()),
      )

  if (search && widgets.length === 0) return null
  return (
    <section className="space-y-3">
      <h2 className="font-semibold text-lg">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {widgets.map((w) => (
          <WidgetCard key={w.id} categoryId={category.id} widget={w} />
        ))}
        {!search && (
          <button onClick={() => onAdd?.(category.id)} className="rounded-xl border border-dashed border-black/10 h-40 flex items-center justify-center text-sm text-muted">
            <Plus className="mr-2" size={16} /> Add Widget
          </button>
        )}
      </div>
    </section>
  )
}


