import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/login.module.css'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    // check the credentials and get the server response
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json();
    if(data.status === 'success') {
      setIsAuthenticated(true)
    }
  }
  
  useEffect(() => {
    if(isAuthenticated) {
        router.push('/dashboard')
    }
  },[isAuthenticated])
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" placeholder="Enter your username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" placeholder="Enter your password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
