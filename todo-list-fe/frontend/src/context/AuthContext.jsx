import { createContext, useState, useEffect } from 'react'

import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {


    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );


    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens')
            ? jwtDecode(localStorage.getItem('authTokens'))
            : null
    );

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (email, password) => {
        const response = await fetch('http://localhost:8000/api/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()

        console.log(data);

        if (response.status === 200) {
            console.log('Logged In')

            setAuthTokens(data)

            setUser(jwtDecode(data.access))

            localStorage.setItem('authTokens', JSON.stringify(data))

            navigate('/')
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            alert('Someting went wrong' + response.status)
        }

    }

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                username,
                password,
                password2
            })
        })

        if (response.status == 201) {
            navigate('/login')
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            alert('Someting went wrong' + response.status)
        }
    }

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens')
        navigate('/login')
    }


    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))

        }
        setLoading(false)

    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}