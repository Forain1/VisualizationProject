import { useState,useEffect } from 'react'
import Papa from 'papaparse'
import AgeGender from './components/AgeGender'
import Workout from './components/Workout'
import TimeExperience from './components/TimeExperience'
import BMIFatScatterPlot  from './components/BMIFatScatterPlot'
import WaterIntakeBubbleChart from './components/WaterIntakeBubbleChart'
import WorkoutEfficiencyRadarECharts from './components/WorkoutEfficiencyRadarECharts'

function App() {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

      <WaterIntakeBubbleChart data={csvData}/>
    </>

    );




}

export default App;