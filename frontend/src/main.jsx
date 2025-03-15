import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import App from '../src/App'
import store from "../src/app/store.js"
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider as UiProvider } from '@/components/ui/';
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

if (process.env.NODE_ENV === "production") disableReactDevTools()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UiProvider>
          {/* <App /> */}
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </UiProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
