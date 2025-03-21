import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Index from './components/Index'
import Login from './features/auth/Login'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'
import ProjectsList from './features/projects/ProjectsList'
import ProjectDetails from './features/projects/ProjectDetails'
import { MenuProvider } from './components/layout/MenuProvider'
import RequireAuth from './features/auth/RequireAuth'
import Prefetch from './features/auth/Prefetch'
import EditProject from './features/projects/EditProject'
import About from './components/About'
import PersistLogin from './features/auth/PersistLogin'
import ServicesList from './features/services/ServicesList'
import ServiceDetail from './features/services/ServicesDetail'
import ScrollToTop from './components/otherComps/ScrollToTop'
import ContactPage from './features/contact/ContactPage'
import AddNewProject from './features/projects/AddNewProject'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <MenuProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/services' element={<ServicesList />} />
            <Route path='/services/:serviceId' element={<ServiceDetail />} />
            <Route path='/projects' >
              <Route index element={<ProjectsList />} />
              <Route path=':projectId' element={<ProjectDetails />} />
            </Route>
            {/* PROTECTED ROUTES */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route element={<Prefetch />}>
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='editproject/:id' element={<EditProject />} />
                  <Route path='addproject' element={<AddNewProject />} />
                </Route>
              </Route>
            </Route>
            {/* PROTECTED ROUTES */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MenuProvider>
    </>
  )
}

export default App
