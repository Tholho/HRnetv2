import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import { Welcome } from './pages/welcome/welcome.tsx'
import EmployeesPage from './pages/employees/employees.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/employees-list" element={<EmployeesPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
