import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { VocabTopicsPage } from './features/vocab/VocabTopicsPage'
import { VocabSessionPage } from './features/vocab/VocabSessionPage'
import { ConjugationSetupPage } from './features/conjugation/ConjugationSetupPage'
import { ConjugationSessionPage } from './features/conjugation/ConjugationSessionPage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/vocab" element={<VocabTopicsPage />} />
        <Route path="/vocab/:topicId" element={<VocabSessionPage />} />
        <Route path="/conjugations" element={<ConjugationSetupPage />} />
        <Route path="/conjugations/session" element={<ConjugationSessionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
