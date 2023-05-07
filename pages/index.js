import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [formData,setFormdata] = useState({email:"",password:""})
  
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(formData.email === "" || formData.password ==="" ){
      alert('please enter your email or password')
    }else{
      try {
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.success) {
          router.push('/homepage')
          setIsAuthenticated(true)
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="fade-in text-center pt-20 relative pb-8 sm:mx-auto sm:px-1 sm:max-w-xl">
        <div className="px-4 pt-4 sm:px-0 ">
          <div className="max-w-sm bg-sky-200 rounded-lg border border-gray-200 shadow-md">
            <form onSubmit={handleSubmit} className="p-10">
              <label className="text-2xl font-bold ">
                Email:
                <input
                  type="email"
                  name="email"
                  className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormdata({ ...formData, email: e.target.value })
                  }
                />
              </label>
              <br />
              <label className="text-2xl font-bold ">
                Password:
                <input
                  type="password"
                  name="password"
                  className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormdata({ ...formData, password: e.target.value })
                  }
                />
              </label>
              <br />
              <button
                type="submit"
                className="py-3 px-3 dark:bg-emerald-400/20 dark:text-emerald-200 text-sm font-semibold rounded-md shadow-lg focus:outline-none bg-emerald-500/50 hover:shadow-emerald-400/30 hover:bg-emerald-600"
              >
                <span className="flex content-start items-center text-cyan-800 hover:text-emerald-800">
                  Login
                  <svg
                    className="ml-2 -mr-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
