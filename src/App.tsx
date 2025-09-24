function App() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="h-16 border-b border-black/5 flex items-center px-6">
        <div className="font-semibold">Dashboard v1</div>
        <div className="ml-auto text-sm text-muted">Scaffold ready</div>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl shadow-soft bg-card h-40" />
          <div className="rounded-xl shadow-soft bg-card h-40" />
          <div className="rounded-xl shadow-soft bg-card h-40" />
        </div>
      </main>
    </div>
  )
}

export default App
