import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
import {Box, Button,Container} from '@mui/material'




function AgeGender({data}){

const [sortway,setSortway] = useState(0);

const sourceData= [
    {ageRange:20,Male:0,Female:0},
    {ageRange:30,Male:0,Female:0},
    {ageRange:40,Male:0,Female:0},
    {ageRange:50,Male:0,Female:0},
    {ageRange:60,Male:0,Female:0},
];

let totalMale=0,totalFemale=0;

data.forEach(person => {
    let ageRange;
    if(person.Age<20){
        ageRange = 20;
    }else if(person.Age<30){
        ageRange = 30;
    }else if(person.Age<40){
        ageRange = 40;
    }else if(person.Age<50){
        ageRange = 50;
    }else{
        ageRange = 60;
    }
    const item = sourceData.find(i=>i.ageRange===ageRange);
    if(person.Gender==='Female')item.Female++,totalFemale++;
    else item.Male++,totalMale++;
});

const persontage = sourceData.map(item=>{
    return{
        malePercent:(item.Male/totalMale*100).toFixed(1),
        femalePercent:(item.Female/totalFemale*100).toFixed(1)
    }
});

if(sortway===0){
//sort by age
sourceData.sort((a,b)=>{return a.ageRange-b.ageRange;});
}else if(sortway===1){
//sort by male
sourceData.sort((a,b)=>{return a.Male-b.Male;});
}else{
//sort by female
sourceData.sort((a,b)=>{return a.Female-b.Female;});
};


const option = {
    legend: {},
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line'
        },
        formatter:(params)=>{
            let res  = params[0].name + '<br/>';
            res += `${params[0].seriesName}:${params[0].value.Male} 百分比:${persontage[params[0].dataIndex].malePercent}<br/>`;
            res += `${params[1].seriesName}:${params[1].value.Female} 百分比:${persontage[params[1].dataIndex].femalePercent}<br/>`;
            return res;
        },
    },
    dataset:{
        dimensions: ['ageRange', 'Male', 'Female'],
        source:sourceData,
    },
    xAxis:{type:'category',name:'年龄范围',axisLabel: {
      formatter: (value) => {
        if (value === '20') return '<20';
        else if (value === '30') return '20-30';
        else if (value === '40') return '30-40';
        else if (value === '50') return '40-50';
        else return '>50';
      }
    }},
    yAxis:{name:'人数'},
    series: [
      {type: 'bar',encode:{x:'ageRange',y:'Male'},name:'Male'},
      {type: 'bar',encode:{x:'ageRange',y:'Female'},name:'Female'}
    ],
  };



function switchSortWay(){
    console.log(sortway);
    if(sortway===0)setSortway(1);
    else if(sortway===1)setSortway(2);
    else setSortway(0);
}  


  return (
    <Container>
      <ReactECharts option={option} style={{height: 400}} />
      <Box sx={{
        display:'flex',
        justifyContent:'center',
        mt:0
      }}>
      <Button variant='contained' onClick={switchSortWay}>
        {sortway===0&&`按年龄排序`}
        {sortway===1&&`按男性数量排序`}
        {sortway===2&&`按女性数量排序`}</Button>
      </Box>
  </Container>





  );
};

export default AgeGender;