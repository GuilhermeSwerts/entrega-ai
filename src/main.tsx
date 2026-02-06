import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { RouterMap } from './router/Routes'
import { LoaderProvider } from './context/LoaderContext'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LoaderProvider>
      <ToastContainer />
      <RouterMap />
    </LoaderProvider>
  </BrowserRouter>,
)
