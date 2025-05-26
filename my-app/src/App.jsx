import { useState,useEffect } from 'react'
import Papa from 'papaparse'
import AgeGender from './components/AgeGender'
import Workout from './components/Workout'
import TimeExperience from './components/TimeExperience'


function App() {
  const [csvData,setCsvData] = useState([]);
  useEffect(()=>{
    fetch('/dataset.csv')
    .then(res=>res.text())
    .then((text)=>{
      Papa.parse(text,{
        header:true,
        skipEmptyLines:true,
        complete:(res,file)=>{
          setCsvData(res.data);
        } 
      })
    })
  },[]);
  useEffect(() => {
    console.log(csvData); 
  }, [csvData]);
     
    return (
    <>
    <AgeGender data={csvData}/>
    <Workout data={csvData}/>
        <TimeExperience data={csvData}/>
    </>

    );




}

export default App
