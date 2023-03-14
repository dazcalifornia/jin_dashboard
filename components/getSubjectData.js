import { useState,useEffect } from 'react';

export function GetSubjectData(id){

    const [subjectData, setsubjectData] = useState([])
    useEffect(()=>{
        fetch('http://https://672f-45-136-254-11.ap.ngrok.io/grades/${id}')
        .then(response => response.json())
        .then(data => setsubjectData(data))
        .catch(error => console.log(error));
      },[])

      return subjectData
}