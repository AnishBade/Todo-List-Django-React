import { Route, Navigate as Redirect } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
    let { user } = useContext(AuthContext);
    return user ? children : <Redirect to="/login" />;
}

export default PrivateRoute;