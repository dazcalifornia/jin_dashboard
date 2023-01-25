import { useState,useEffect } from 'react'

export default function Dashboard(){
  const [data,setData] = useState([])
  useEffect(()=>{
    fetch('http://localhost:8080/test')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.log(error));
  })

  return(
    <div>
      <nav>
      <p className="text-3xl font-bold underline text-white">
    Hello world!
  </p>
        {/* make logout button */}
        <button type="button">
          logout
        </button>
      </nav>
      <h1>Dashboard</h1>
      <button type="button" onClick={()=>alert("hello")}>
        hello
        </button>
        {data.map(item => (
          <div key={item.id}>
            {item.regionid}
            {item.name}
            <button type="button" onClick={()=>alert(item.id)}>
              hello
              </button>
            </div>
        )
        )}

    </div>
  )
}
