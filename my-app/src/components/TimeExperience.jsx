import EChartsReact from 'echarts-for-react';
import ReactEchart from 'echarts-for-react'
import React, { useRef, useState, useEffect } from 'react'

function TimeExperience({data}){
    const seriesData = [];//每个数组元素中的第一个元素是训练频率,第二个元素是专业水平,第三个元素是人数
    for(let i = 0 ; i<7 ; i++){
        for(let j=0 ; j<3 ; j++){
            const res = [(i+1).toString(),(j+1).toString(),0];
            seriesData.push(res);
        }
    }
    let total = 0;
    data.forEach(element => {
    const point =  seriesData.find(i=>i[0]===element['Workout_Frequency (days/week)']&&i[1]===element.Experience_Level)
    if(point)point[2]++,total++;
    
    });

    let minCount=1000,maxCount=0;
    seriesData.forEach(i=>{
        if(i[2]!=0){
            if(i[2]>maxCount)maxCount=i[2];
            if(i[2]<minCount)minCount=i[2];
        }
    })

    const option={
        xAxis:{
            type:'category',
            data:['1','2','3','4','5','6','7'],
            name:'一周的训练次数',
            axisLabel:{
                formatter:(v)=>{
                    return `${v}次`
                }
            }
        },
        yAxis:{
            type:'category',
            data:['1','2','3'],
            name:'专业水平',
            axisLabel:{
                formatter:(value)=>{
                    let res = '级';
                    if(value==='1')res = '初'+res;
                    else if(value==='2')res = '中'+res;
                    else res = '高'+res;
                    return res;
                }
            }
        },
        visualMap: {
            min: minCount,
            max: maxCount,  // 根据人数最大值调整
            dimension: 2, // 依据数据的第三维“人数”来映射颜色
            inRange: {
            color: ['#d2eaff', '#74a9cf', '#2166ac'] // 颜色渐变，从浅到深
            },
            calculable: true,
            orient: 'vertical',
            left: 'right',
            top: '15%',
        },
        series:[
        {
            type: 'scatter',
            data: seriesData,
            symbolSize: function (data) {
                return Math.sqrt(data[2]) * 4;
             },
        }
    ]
    }

    return <EChartsReact option={option} />

}

export default TimeExperience;