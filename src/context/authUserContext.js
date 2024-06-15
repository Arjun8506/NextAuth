"use client"

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext()

export const useAuthContext = ()=> {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
    const [user, setuser] = useState({})

    useEffect(() => {
        const userData = localStorage.getItem('nextAuthUser');
        if (userData) {
          setuser(JSON.parse(userData));
        }
      }, []);

    return <AuthContext.Provider value={{ user, setuser }}>
        {children}
    </AuthContext.Provider>
}