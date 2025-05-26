import React from 'react';
import ReactECharts from 'echarts-for-react';

const ExperienceLevelBarChart = ({ data }) => {
  // 经验水平映射
  const experienceLevels = {
    1: '初级',
    2: '中级',
    3: '高级'
  };

  // 计算每个经验水平的平均指标
  const barData = Object.entries(experienceLevels).map(([level, label]) => {
    const levelData = data.filter(item => parseInt(item.Experience_Level) === parseInt(level));
    const count = levelData.length;
    if (count === 0) return null;
return {
    level: label,
    BMI: parseFloat((levelData.reduce((sum, item) => sum + parseFloat(item.BMI), 0) / count).toFixed(1)),
    Resting_BPM: parseFloat((levelData.reduce((sum, item) => sum + parseInt(item.Resting_BPM), 0) / count).toFixed(1)),
    Max_BPM: parseFloat((levelData.reduce((sum, item) => sum + parseInt(item.Max_BPM), 0) / count).toFixed(1)),
  };
}).filter(Boolean);
  // 指标配置
  const indicators = [
    { name: 'BMI', color: '#5e6ec1' },
    { name: '静息心率', color: '#9bcb7e' }, 
    { name: '最大心率', color: '#f1cb68' }
  ];

  // 生成系列数据
  const generateSeries = (type = 'bar') => 
    indicators.map(indicator => ({
      name: indicator.name,
      type: type,
      data: barData.map(item => ({
        value: item[indicator.name === '静息心率' ? 'Resting_BPM' : 
               indicator.name === '最大心率' ? 'Max_BPM' : 'BMI'],
        itemStyle: { color: indicator.color }
      })),
      label: {
        show: type === 'bar',
        position: 'top',
        formatter: '{c}',
        color: '#333'
      },
      barWidth: '20%',
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 3 }
    }));

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: params => {
        const level = params[0].axisValue;
        return [
          `<div style="margin-bottom:5px;font-weight:bold">${level}</div>`,
          ...params.map(param => `
            <div style="display:flex;align-items:center;margin:2px 0">
              <span style="display:inline-block;width:10px;height:10px;background:${param.color};margin-right:5px;border-radius:50%"></span
              ${param.seriesName}: <strong>${param.value}</strong>
            </div>
          `)
        ].join('')
      }
    },
    legend: {
      data: indicators.map(item => item.name),
      textStyle: { color: '#333' },
      top: 0
    },
    grid: {
      top: '15%',
      bottom: '15%',
      left: '3%',
      right: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: barData.map(item => item.level),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { 
        lineStyle: { 
          type: 'dashed',
          color: '#eee'
        } 
      },
      axisLabel: { color: '#666' }
    },
    series: generateSeries('bar'),
    toolbox: {
      right: 20,
      top: 0,
      feature: {
        magicType: {
          type: ['bar', 'line'],
          title: { 
            bar: '切换柱状图',
            line: '切换折线图' 
          }
        },
        dataView: {
          title: '查看数据',
          readOnly: true,
          lang: ['数据视图', '关闭', '刷新'],
          buttonColor: '#666'
        }
      }
    }
  };

  return (
    <ReactECharts 
      option={option}
      style={{ 
        height: '400px', 
        width: '100%',
        backgroundColor: 'transparent' 
      }}
      opts={{ renderer: 'svg' }}
    />
  );
};

export default ExperienceLevelBarChart;
