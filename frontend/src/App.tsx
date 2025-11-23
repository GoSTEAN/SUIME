import React, { useEffect, useState } from 'react'
// Temporary: render the converted generated page for quick preview
import GeneratedPage from './pages/GeneratedPage'

export type Project = {
  id: string
  title: string
  description: string
  pool: string
  distributionDate: string // ISO
  owner: string
  contributions?: { from: string; amount: number; date: string }[]
}

const STORAGE_KEY = 'suime_projects_v1'

export default function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [address, setAddress] = useState<string | null>(null)
  const [route, setRoute] = useState<'landing' | 'dashboard'>('landing')

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setProjects(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  function addProject(p: Project) {
    setProjects(prev => [p, ...prev])
  }

  function addContribution(projectId: string, from: string, amount: number) {
    setProjects(prev =>
      prev.map(p =>
        p.id === projectId
          ? { ...p, contributions: [...(p.contributions || []), { from, amount, date: new Date().toISOString() }] }
          : p
      )
    )
  }

  // central connect logic: generate a demo address (replace with real wallet flow)
  function connectWallet() {
    const fake = '0x' + Math.floor(Math.random() * 1e16).toString(16)
    setAddress(fake)
    setRoute('dashboard')
  }

  function disconnectWallet() {
    setAddress(null)
    setRoute('landing')
  }

  // For now show the generated page so you can preview the static conversion.
  // Later we can wire this into your existing route/state logic.
  return (
    <div className="app">
      <GeneratedPage />
    </div>
  )
}
