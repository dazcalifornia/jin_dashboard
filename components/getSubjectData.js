import { useState,useEffect } from 'react';

export function GetSubjectData(id){
    const [subjectData, setsubjectData] = useState([])
    useEffect(()=>{
        fetch('http://localhost:8080/grades/${id}')
        .then(response => response.json())
        .then(data => setsubjectData(data))
        .catch(error => console.log(error));
      },[])

      return subjectData
}