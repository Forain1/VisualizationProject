import ReactEchart from 'echarts-for-react'
import React, { useRef, useState, useEffect } from 'react';
import {Box,Container} from '@mui/material'

function Workout({data,style}){
    const containerRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const offsetWidth = containerRef.current.offsetWidth;
        setWidth(offsetWidth);
    }, []);



const maleData = [
    {age:20},{age:30},{age:40},{age:50},{age:60}
];
const femaleData = [
     {age:20},{age:30},{age:40},{age:50},{age:60}
];

data.forEach((person)=>{
    let age
    if(person.Age<=20)age=20
    else if(person.Age<=30)age=30;
    else if(person.Age<=40)age=40;
    else if(person.Age<=50)age=50;
    else age=60;
    if(person.Gender==='Male'){
       const male =  maleData.find(i=>i.age===age);
       const type = person.Workout_Type;
       if( type in male){
            male[type]++;
       }else{
            male[type]=1;
       }
    }else{
        const female = femaleData.find(i=>i.age===age);
        const type = person.Workout_Type;
        if(type in female){
            female[type]++;
        }else{
            female[type]=1;
        }
    }
})



const radius = Math.min(40, width /10);


const maleSeries = [];
const femaleSeries = [];
const title = [];


for(let index = 0 ; index < maleData.length ; index++){
    let i  = maleData[index];
    let fi = femaleData[index];
    let ageRange = '';
    let leftPercent = (index + 0.5) * (100 / maleData.length);
    const res = [];
    const feres = [];

    if(i.age===20)ageRange='<20';
    else if(i.age===30)ageRange='20-30';
    else if(i.age===40)ageRange='30-40';
    else if(i.age===50)ageRange='40-50';
    else ageRange='>50';

    for(let key in i){
        if(key==='age')continue;
        res.push({
            name:key,
            value:i[key]
        })
    }
    for(let key in fi){
        if(key==='age')continue;
        feres.push({
            name:key,
            value:fi[key]
        })
    }
    
    maleSeries.push({
        type:'pie',
        data:res,
        center:[leftPercent+'%','50%'],
        radius:radius,
        roseType: 'area'
    })
    femaleSeries.push(
        {
            type:'pie',
            data:feres,
            center:[leftPercent+'%','50%'],
            radius:radius,
            roseType: 'area' 
        }
    )
    title.push({
        text:ageRange,
        left:leftPercent+'%',
        bottom:'5%',
        textAlign: 'center'
    })

}
    

    const maleOption = {
        legend:{},
        tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>占比: {d}%'
        },  
        title:[...title,{
            text:'男性不同年龄段运动类型占比',
            textAlign:'center',
            top:'10%',
            left:'50%',
        }],
        series:maleSeries
    };

    const femaleOption = {
        legend:{},
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>占比: {d}%'
        },
        title:[...title,{
            text:'女性不同年龄段运动类型占比',
            textAlign:'center',
            top:'10%',
            left:'50%'
        }],
        series:femaleSeries
    }


    return <Container  ref={containerRef}>
        <ReactEchart  option={maleOption}/>
        <ReactEchart  option={femaleOption}/>
    </Container>

}

export default Workout;