import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";  
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context         // context se extract kr liya 

    const handleLogin = async ({ email, password }) => {
        setLoading(true)                              //after click login button
        try{
            const data = await login({ email, password })    // iss data mein user bhi return hota hai
            setUser(data.user)
        } catch(err){

        } finally {
            setLoading(false)                             // login ke baad loading ko false kar do
        }
        
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try{
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch(err) {

        } finally {
            setLoading(false)
        }
        
    }

    const handleLogout = async () => {
        setLoading(true)
        try{
            const data = await logout()
            setUser(null)               // user ko hatana hai
        } catch(err) {

        } finally {
            setLoading(false)
        }
        
    }
    
    useEffect(() => {
        
        const getAndSetUser = async () => {
            try{
                const data = await getMe()
                setUser(data.user)
            } catch (err){      

            } finally {
                setLoading(false)
            }   
            
        }

        getAndSetUser()
    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}