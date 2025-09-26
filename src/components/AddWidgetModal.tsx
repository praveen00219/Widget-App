import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { useDashboardStore } from '../store/dashboard'
import { widgetCatalog } from '../data/catalog'

type Props = { open: boolean; onClose: () => void; defaultCategoryId?: string }

const TABS = [
  { id: 'cspm', name: 'CSPM' },
  { id: 'cwpp', name: 'CWPP' },
  { id: 'image', name: 'Image' },
  { id: 'ticket', name: 'Ticket' },
]

export function AddWidgetModal({ open, onClose, defaultCategoryId }: Props) {
  const categories = useDashboardStore((s) => s.categories)
  const addWidget = useDashboardStore((s) => s.addWidget)
  const removeWidget = useDashboardStore((s) => s.removeWidget)
  const search = useDashboardStore((s) => s.searchQuery)

  const [activeTab, setActiveTab] = useState('cspm')
  const [targetCategoryId, setTargetCategoryId] = useState(defaultCategoryId || categories[1]?.id || '')
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [chartType, setChartType] = useState<'none' | 'donut' | 'bars'>('none')

  const existing = useMemo(() => {
    return new Set(categories.flatMap((c) => c.widgets.map((w) => `${c.id}|${w.name}`)))
  }, [categories])

  const catalogForTab = widgetCatalog[activeTab as keyof typeof widgetCatalog] || []
  const list = catalogForTab.map((n) => ({ key: `${targetCategoryId}|${n}`, name: n }))

  const filtered = useMemo(() => {
    const q = (search || '').toLowerCase()
    return list.filter((w) => w.name.toLowerCase().includes(q))
  }, [list, search])

  // Keep selected category in sync when opener suggests one
  if (open && defaultCategoryId && targetCategoryId !== defaultCategoryId) {
    setTargetCategoryId(defaultCategoryId)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-start pt-16 z-50">
      <div className="w-[640px] mx-auto rounded-xl bg-white shadow-2xl overflow-hidden">
        <div className="h-12 px-4 flex items-center border-b">
          <div className="font-medium">Add Widget</div>
          <button className="ml-auto h-8 w-8 grid place-items-center hover:bg-black/5 rounded-md" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="px-4 py-3 text-sm text-muted">Personalize your dashboard by adding the following widget</div>
        <div className="px-4">
          <div className="flex border-b mb-3">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`px-3 h-9 ${activeTab === t.id ? 'border-b-2 border-ring text-fg' : 'text-muted'}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.name}
              </button>
            ))}
          </div>
          <div className="mb-3">
            <select
              value={targetCategoryId}
              onChange={(e) => setTargetCategoryId(e.target.value)}
              className="h-9 px-3 rounded-lg border border-black/10 bg-white shadow-sm text-sm"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 max-h-48 overflow-auto pr-1">
            {filtered.map((w) => {
              const key = `${targetCategoryId}|${w.name}`
              const isChecked = existing.has(key)
              return (
                <label key={w.key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      const checked = e.target.checked
                      if (checked && !isChecked) {
                        addWidget(targetCategoryId, { name: w.name, description: 'Random text' })
                      } else if (!checked && isChecked) {
                        const cat = categories.find((c) => c.id === targetCategoryId)
                        const wid = cat?.widgets.find((x) => x.name === w.name)?.id
                        if (wid) removeWidget(targetCategoryId, wid)
                      }
                    }}
                  />
                  {w.name}
                </label>
              )
            })}
          </div>
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Or add a custom widget</div>
            <div className="grid grid-cols-2 gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Widget name" className="h-9 px-3 rounded-lg border border-black/10 bg-white shadow-sm text-sm" />
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Widget text" className="h-9 px-3 rounded-lg border border-black/10 bg-white shadow-sm text-sm" />
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <div className="text-muted">Chart</div>
              <select value={chartType} onChange={(e) => setChartType(e.target.value as any)} className="h-9 px-3 rounded-lg border border-black/10 bg-white shadow-sm text-sm">
                <option value="none">None</option>
                <option value="donut">Donut</option>
                <option value="bars">Severity Bars</option>
              </select>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button className="h-9 px-3 rounded-lg border border-black/10 bg-white text-sm" onClick={onClose}>Cancel</button>
              <button
                className="h-9 px-4 rounded-lg bg-ring text-white text-sm"
                onClick={() => {
                  if (!targetCategoryId || !name) return
                  addWidget(targetCategoryId, { name, description: text || 'Random text', chart: chartType === 'none' ? undefined : { type: chartType } })
                  setName('')
                  setText('')
                  setChartType('none')
                  onClose()
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
        <div className="h-3" />
      </div>
    </div>
  )
}


