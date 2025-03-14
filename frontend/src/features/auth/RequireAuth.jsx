import useAuth from "@/hooks/useAuth"
import { useLocation, Outlet, Navigate } from "react-router-dom"


const RequireAuth = () => {
    const location = useLocation()
    const {isLoggedIn} = useAuth()
    const content = isLoggedIn ? <Outlet /> : <Navigate to={"/login"} state={{from: location}} replace />
    // useEffect(() => {
    // }, [token])
  return content
}

export default RequireAuth
