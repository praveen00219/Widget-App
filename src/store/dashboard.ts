import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export type Widget = {
  id: string
  name: string
  description: string
  chart?: { type: 'donut' | 'bars' }
}

export type Category = {
  id: string
  name: string
  widgets: Widget[]
}

export type DashboardState = {
  categories: Category[]
  searchQuery: string
}

type DashboardActions = {
  setSearchQuery: (q: string) => void
  addCategory: (name: string) => string
  removeCategory: (categoryId: string) => void
  addWidget: (
    categoryId: string,
    input: { name: string; description: string; chart?: { type: 'donut' | 'bars' } },
  ) => string
  removeWidget: (categoryId: string, widgetId: string) => void
  seedIfEmpty: () => void
}

const seedData: Category[] = [
  {
    id: 'cat-cnapp',
    name: 'CNAPP Dashboard',
    widgets: [],
  },
  {
    id: 'cat-cspm',
    name: 'CSPM Executive Dashboard',
    widgets: [
      { id: nanoid(), name: 'Cloud Accounts', description: 'Random text' },
      { id: nanoid(), name: 'Cloud Account Risk Assessment', description: 'Random text' },
      { id: nanoid(), name: 'Placeholder', description: 'Random text' },
    ],
  },
  {
    id: 'cat-cwpp',
    name: 'CWPP Dashboard',
    widgets: [
      { id: nanoid(), name: 'Top 5 Namespace Specific Alerts', description: 'Random text' },
      { id: nanoid(), name: 'Workload Alerts', description: 'Random text' },
    ],
  },
  {
    id: 'cat-registry',
    name: 'Registry Scan',
    widgets: [
      { id: nanoid(), name: 'Image Risk Assessment', description: 'Random text' },
      { id: nanoid(), name: 'Image Security Issues', description: 'Random text' },
    ],
  },
]

export const useDashboardStore = create<DashboardState & DashboardActions>()(
  persist(
    (set, get) => ({
      categories: [],
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      addCategory: (name) => {
        const id = nanoid()
        set((s) => ({ categories: [...s.categories, { id, name, widgets: [] }] }))
        return id
      },
      removeCategory: (categoryId) =>
        set((s) => ({ categories: s.categories.filter((c) => c.id !== categoryId) })),
      addWidget: (categoryId, input) => {
        const widget: Widget = {
          id: nanoid(),
          name: input.name,
          description: input.description,
          chart: input.chart,
        }
        set((s) => ({
          categories: s.categories.map((c) =>
            c.id === categoryId ? { ...c, widgets: [...c.widgets, widget] } : c,
          ),
        }))
        return widget.id
      },
      removeWidget: (categoryId, widgetId) =>
        set((s) => ({
          categories: s.categories.map((c) =>
            c.id === categoryId
              ? { ...c, widgets: c.widgets.filter((w) => w.id !== widgetId) }
              : c,
          ),
        })),
      seedIfEmpty: () => {
        const has = get().categories.length > 0
        if (!has) set({ categories: seedData })
      },
    }),
    { name: 'accuknox-dashboard' },
  ),
)


