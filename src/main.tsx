import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routesMap } from './router/Routes'
import { LoaderProvider } from './context/LoaderContext'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LoaderProvider>
      <Routes>
        {routesMap.map((x: any) => {
          return <Route Component={x.component} path={x.path} />
        })}
      </Routes>
    </LoaderProvider>
  </BrowserRouter>,
)
