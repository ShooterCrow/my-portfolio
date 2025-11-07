import { selectCurrentToken } from '@/features/auth/authSlice'
import { jwtDecode } from 'jwt-decode'
import { useSelector } from 'react-redux'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isLoggedIn = false

    if (token) {
        isLoggedIn = true
        const data = jwtDecode(token)
        const {username, roles} = data.UserInfo
        return {username, roles, isLoggedIn}
    }

  return {username: "", roles: [], isLoggedIn}
}

export default useAuth
