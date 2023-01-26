import { useRouter } from 'next/router';
import { useState,useEffect } from 'react'

export default function Dashboard(){
  const [data,setData] = useState([])

  const router = useRouter()
  useEffect(()=>{
    fetch('http://localhost:8080/test')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.log(error));
  })
  const handleSignout=()=>{
    router.back()
  }

  return (
    <div>
      <div className="flex min-h-screen bg-gradient-to-tr from-slate-900 to-sky-200">
        <div className="fade-in text-center pt-20 relative pb-8 sm:mx-auto sm:px-1 sm:max-w-xl">
          <div className="px-4 pt-4 sm:px-0 ">
            <nav>
              <p className="text-3xl font-bold underline text-white">
                Hello world!
              </p>
              {/* make logout button */}
              <button 
              onClick={handleSignout}
              type="button">logout</button>
            </nav>
            <h1>Dashboard</h1>
            <button type="button" onClick={() => alert("hello")}>
              hello
            </button>
            {data.map((item) => (
              <div key={item.id}>
                {item.regionid}
                {item.name}
                <button type="button" onClick={() => alert(item.id)}>
                  hello
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
