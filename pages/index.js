import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [formData,setFormdata] = useState({email:"",password:""})
  const router = useRouter()

  const handleSubmit =  (e) => {
    e.preventDefault();
    if(e.email === "" || e.password==="" ){
      alert('please enter your email or password')
    }else{
      router.push('/dashboard')
      setIsAuthenticated('true')
    }
    console.log(formData)
  }
  
  return (
    <>
      <div className='text-3xl text-green-600 p-2'>
      Hello Geeks!
    </div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="email"
            name="email" 
            placeholder="Enter your email"
            onChange={(e) => setFormdata({...formData,email: e.target.value})}
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password"
            name="password"
            placeholder="Enter your password" 
            onChange={(e)=> setFormdata({...formData,password:e.target.value})}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  )
}
