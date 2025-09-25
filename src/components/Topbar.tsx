import { Search, Plus } from 'lucide-react'
import { useDashboardStore } from '../store/dashboard'

export function Topbar({ onAdd }: { onAdd: () => void }) {
  const search = useDashboardStore((s) => s.searchQuery)
  const setSearch = useDashboardStore((s) => s.setSearchQuery)
  return (
    <header className="h-16 border-b border-black/5 flex items-center px-6 gap-3">
      <div className="text-sm text-muted">Home</div>
      <div>›</div>
      <div className="font-semibold">Dashboard v2</div>
      <div className="mx-6 relative w-[420px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search anything..."
          className="w-full h-10 pl-9 pr-3 rounded-lg border border-black/10 bg-white shadow-sm text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button onClick={onAdd} className="h-9 px-3 rounded-lg border border-black/10 bg-white shadow-sm text-sm inline-flex items-center gap-2">
          <Plus size={16} /> Add Widget
        </button>
        <select className="h-9 px-3 rounded-lg border border-black/10 bg-white shadow-sm text-sm">
          <option>Last 2 days</option>
          <option>Last 7 days</option>
        </select>
      </div>
    </header>
  )
}


