import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {

    const isAuth = localStorage.getItem('auth')

    if(isAuth){
        return children
    }

    return <Navigate to='/login' replace />

}