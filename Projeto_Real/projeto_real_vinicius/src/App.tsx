import Login from './pages/login/index.tsx'
import Home from './pages/home/index.tsx'
import {BrowserRouter,Routes,Route} from 'react-router'
import Detalhes from './pages/detalhes/index.tsx'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/produto" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  )
}