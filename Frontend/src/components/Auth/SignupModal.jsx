import { useState } from "react"
import axios from "axios"

export default function SignupModal(){

 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")

 const submit = async () => {
  await axios.post("http://localhost:5000/auth/signup",{email,password})
  alert("Account created")
 }

 return (
  <div>
   <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
   <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />

   <button onClick={submit}>Signup</button>
  </div>
 )
}
