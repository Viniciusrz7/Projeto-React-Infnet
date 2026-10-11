import { createRoot } from 'react-dom/client'
import App, { App2 } from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <div>
    <App/> 
    <App2/>
  </div> 
)
