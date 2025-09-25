import { useEffect } from 'react'
import { useDashboardStore } from './store/dashboard'
import { CategorySection } from './components/CategorySection'
import { Topbar } from './components/Topbar'
import { AddWidgetModal } from './components/AddWidgetModal'
import { useState } from 'react'

function App() {
  const categories = useDashboardStore((s) => s.categories)
  const seedIfEmpty = useDashboardStore((s) => s.seedIfEmpty)

  useEffect(() => {
    seedIfEmpty()
  }, [seedIfEmpty])

  const [open, setOpen] = useState(false)
  const [categoryForAdd, setCategoryForAdd] = useState<string | undefined>()

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Topbar onAdd={() => { setCategoryForAdd(undefined); setOpen(true) }} />
      <main className="p-6 space-y-8">
        {categories.map((cat) => (
          <CategorySection key={cat.id} id={cat.id} onAdd={(cid) => { setCategoryForAdd(cid); setOpen(true) }} />
        ))}
      </main>
      <AddWidgetModal open={open} onClose={() => setOpen(false)} defaultCategoryId={categoryForAdd} />
    </div>
  )
}

export default App
