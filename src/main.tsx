import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { RouterMap } from './router/Routes'
import { LoaderProvider } from './context/LoaderContext'
import { ToastContainer } from 'react-toastify'
import { RoutesProvider } from './context/RoutesContext'
import { UserDataProvider } from './context/UserDataContext'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LoaderProvider>
      <UserDataProvider>
        <RoutesProvider>
          <ToastContainer />
          <RouterMap />
        </RoutesProvider>
      </UserDataProvider>
    </LoaderProvider>
  </BrowserRouter>,
)
