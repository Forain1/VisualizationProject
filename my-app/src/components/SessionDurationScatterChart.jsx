import React from 'react';
import ReactECharts from 'echarts-for-react';

const SessionDurationScatterChart = ({ data }) => {
  // 定义颜色方案
  const colorPalette = [
    '#c23531', '#2f4554', '#61a0a8', 
    '#d48265', '#91c7ae', '#749f83',
    '#ca8622', '#bda29a', '#6e7074',
    '#546570', '#c4ccd3'
  ];

  // 获取所有运动类型
  const workoutTypes = [...new Set(data.map(item => item['Workout_Type']))];
  
  // 创建颜色映射
  const workoutTypeColors = Object.fromEntries(
    workoutTypes.map((type, index) => [type, colorPalette[index % colorPalette.length]])
  );

  // 处理数据
  const scatterData = data.map(item => ({
    value: [
      item['Session_Duration (hours)'],
      item['Calories_Burned'],
      item['Workout_Type'],
      item['Workout_Frequency (days/week)'],
      item.Age,
      item.Gender
    ],
    name: item['Workout_Type'],
    symbolSize: item['Workout_Frequency (days/week)'] * 5,
    itemStyle: {
      color: workoutTypeColors[item['Workout_Type']]
    }
  }));

  // 图表配置
  const option = {
    title: {
      text: '运动时长 vs 卡路里消耗',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: params => {
        return `
          运动类型: <span style="color:${params.color}">■</span> ${params.value[2]}<br/>
          时长: ${params.value[0]}小时<br/>
          卡路里: ${params.value[1]}千卡<br/>
          频率: ${params.value[3]}天/周<br/>
          年龄: ${params.value[4]}岁<br/>
          性别: ${params.value[5]}
        `;
      }
    },
    legend: {
      data: workoutTypes,
      selected: Object.fromEntries(workoutTypes.map(type => [type, true])),
      orient: 'vertical',  // 垂直排列
      right: 10,          // 右侧位置
      top: 'center',      // 垂直居中
      itemGap: 15,        // 图例项间距
      formatter: function (name) {
        return `{square|■} ${name}`;
      },
      textStyle: {
        rich: {
          square: {
            color: workoutTypeColors[name],
            fontSize: 12,
            padding: [0, 5, 0, 0]
          }
        }
      }
    },
    grid: {
      right: '20%',  // 为图例留出空间
      left: '10%',
      containLabel: true
    },
    xAxis: {
      name: '运动时长 (小时)',
      nameLocation: 'middle',
      nameGap: 30,
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      }
    },
    yAxis: {
      name: '卡路里消耗 (千卡)',
      nameLocation: 'middle',
      nameGap: 30,
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      }
    },
    series: [{
      name: '运动数据',
      type: 'scatter',
      data: scatterData,
      symbolSize: data => data.symbolSize,
      itemStyle: {
        color: params => workoutTypeColors[params.data.value[2]]
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }],
    toolbox: {
      feature: {
        dataZoom: {},
        restore: {},
        saveAsImage: {}
      },
      right: '25%',
      top: 20
    }
  };

  return <ReactECharts option={option} style={{ height: '500px', width: '100%' }} />;
};

export default SessionDurationScatterChart;
