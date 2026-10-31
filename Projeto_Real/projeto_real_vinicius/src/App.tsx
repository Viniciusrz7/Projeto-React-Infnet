import Login from './pages/login/index.tsx'
import Home from './pages/home/index.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Detalhes from './pages/detalhes/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/produto/:id" element={<Detalhes />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </QueryClientProvider>
  )
}