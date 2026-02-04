import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

 const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("user")
  return saved ? JSON.parse(saved) : null
})


 const [showLogin,setShowLogin] = useState(false)
 const [isSignup,setIsSignup] = useState(false)
 const [redirectPage, setRedirectPage] = useState(null)
 const [pageAfterLogin, setPageAfterLogin] = useState(null)

 useEffect(()=>{
  if(user){
   localStorage.setItem("user",JSON.stringify(user))
  }
 },[user])

 return (
  <AuthContext.Provider value={{
   user,setUser,
   showLogin,setShowLogin,
   isSignup,setIsSignup,redirectPage,
 setRedirectPage,pageAfterLogin,
setPageAfterLogin
  }}>
   {children}
  </AuthContext.Provider>
 )
}
