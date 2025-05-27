import { useState,useEffect } from 'react'
import Papa from 'papaparse'
import ChartCard from './Chartcard'

import AgeGender from './AgeGender'
import Workout from './Workout'
import TimeExperience from './TimeExperience'

import BMIFatScatterPlot  from './BMIFatScatterPlot'
import WaterIntakeBubbleChart from './WaterIntakeBubbleChart'
import WorkoutEfficiencyRadarECharts from './WorkoutEfficiencyRadarECharts'

import AgeBPMLineChart from './AgeBPMLineChart'
import ExperienceLevelBarChart from './ExperienceLevelBarChart'
import SessionDurationScatterChart from './SessionDurationScatterChart'

const Dashboard = () => {
  const [csvData, setCsvData] = useState([]);

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

const div1 = '1 / 1 / 2 / 3';
const div2 = '1 / 3 / 3 / 5';
const div3 = '1 / 5 / 2 / 7';
const div4 = '2 / 1 / 3 / 3';
const div5 = '2 / 5 / 3 / 7';
const div6 = '3 / 1 / 4 / 4';
const div7 = '3 / 4 / 4 / 7';
const div8 = '4 / 1 / 5 / 4';
const div9 = '4 / 4 / 5 / 7';


/**
 * .div1 { grid-area: 1 / 1 / 2 / 3; }
.div2 { grid-area: 1 / 5 / 2 / 7; }
.div3 { grid-area: 2 / 1 / 4 / 3; }
.div4 { grid-area: 1 / 3 / 4 / 5; }
.div5 { grid-area: 2 / 5 / 4 / 7; }
.div6 { grid-area: 4 / 1 / 6 / 4; }
.div7 { grid-area: 4 / 4 / 6 / 7; }
.div8 { grid-area: 6 / 1 / 8 / 4; }
.div9 { grid-area: 6 / 4 / 8 / 7; }
 */

  return (
<div
  style={{ 
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'repeat(5, 350px)',
    columnGap: 50,
    rowGap: 50,
  }}
>

<div  style={{
     gridArea: div1,
}}>
  <ChartCard >
    <AgeGender data={csvData} />
  </ChartCard>
</div>

<div style={{
    gridArea: div2, 
}}>
  <ChartCard>
    <Workout data={csvData} />
    
  </ChartCard>
</div>

<div style={{
     gridArea: div3,
}}>
    <ChartCard>
        <TimeExperience data={csvData}/>
    </ChartCard>

</div>

 <div style={{
    gridArea: div4,
 }}>

    <ChartCard>
        <WorkoutEfficiencyRadarECharts data={csvData}/>
    </ChartCard>
 </div>

<div style={
{
    gridArea: div5,
}
}>
    <ChartCard>
        <WaterIntakeBubbleChart data={csvData}/>
    </ChartCard>
</div>

<div style={{
    gridArea: div6,
}}>
    <ChartCard>
        <BMIFatScatterPlot data={csvData}/>
    </ChartCard>

</div>

<div style={
    {
        gridArea:div7,
}}>
    
    <AgeBPMLineChart data={csvData}/>
</div>

<div style={{
    gridArea:div8
}}>
    <ChartCard style={{height:'580px'}}>
    <ExperienceLevelBarChart data={csvData}/> 
    </ChartCard>
   
</div>


<div style={
    {
        gridArea:div9
    }
}>
    <ChartCard style={{height:'580px'}}>
    <SessionDurationScatterChart data={csvData}/>
    </ChartCard>


</div>

    </div>
  );
};

export default Dashboard;