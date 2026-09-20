import { createContext, useState } from 'react';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {           // Yahan children se mtlb ki poore application mein saare components ko user, setUser, etc. ki value access krne dena  

    const [user, setUser] = useState(null)      // null isliye coz koi bhi user shuruwat se logged in nhi rehta
    const [loading, setLoading] = useState(true)


    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}} >
            {children}
        </AuthContext.Provider>
    )
}
