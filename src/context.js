import React, { createContext, useContext,useState,useEffect } from 'react';


const authContext = createContext()

export function AuthContextProvider({children}) {
    const [isUser, setIsUser] = useState(false);
    const [loading,setIsloading] = useState(false)

    useEffect(() => {
        const cookie = document.cookie;
        if (cookie.includes("activeUser") ) {
            setIsUser(true);
        }
      }, [loading]);
    

  return (
    <authContext.Provider value={{isUser,setIsUser,loading,setIsloading}} >
        {children}
    </authContext.Provider>
  )
}

export const useAuthContext =()=>{
    return useContext(authContext)
}