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
    const levelData = data.filter(item => item.Experience_Level === parseInt(level));
    const count = levelData.length;
    if (count === 0) return null;

    return {
      level: label,
      BMI: levelData.reduce((sum, item) => sum + item.BMI, 0) / count,
      Resting_BPM: levelData.reduce((sum, item) => sum + item.Resting_BPM, 0) / count,
      Max_BPM: levelData.reduce((sum, item) => sum + item.Max_BPM, 0) / count,
      count
    };
  }).filter(Boolean);

  // 指标配置
  const indicators = [
    { name: 'BMI', color: '#5e6ec1', maxRef: 25 },
    { name: '静息心率', color: '#9bcb7e', maxRef: 100 },
    { name: '最大心率', color: '#f1cb68', maxRef: null }
  ];

  // 生成系列数据
  const series = indicators.map(indicator => ({
    name: indicator.name,
    type: 'bar',
    data: barData.map(item => ({
      value: item[indicator.name === '静息心率' ? 'Resting_BPM' : 
                 indicator.name === '最大心率' ? 'Max_BPM' : 'BMI'],
      itemStyle: {
        color: indicator.color
      }
    })),
    label: {
      show: true,
      position: 'top',
      formatter: params => params.value.toFixed(1) // 显示一位小数
    },
    barWidth: '20%' // 控制柱宽
  }));

  // 生成参考线
  const markLines = indicators
    .filter(indicator => indicator.maxRef !== null)
    .map(indicator => ({
      name: `${indicator.name}上限`,
      yAxis: indicator.maxRef,
      lineStyle: {
        color: indicator.color,
        type: 'dashed',
        width: 2
      },
      label: {
        formatter: `${indicator.name}上限`,
        position: 'start',
        color: indicator.color
      }
    }));

  const option = {
    title: {
      text: '经验水平分组柱状图（多指标对比）',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: params => {
        const level = params[0].axisValue;
        const levelData = barData.find(item => item.level === level);
        let tooltip = `经验水平: ${level}<br/>`;
        
        params.forEach(param => {
          tooltip += `${param.seriesName}: ${param.value.toFixed(1)}<br/>`;
        });
        
        tooltip += `样本数: ${levelData.count}`;
        return tooltip;
      }
    },
    legend: {
      data: indicators.map(item => item.name),
      top: 30
    },
    grid: {
      top: 80,
      bottom: 60
    },
    xAxis: {
      type: 'category',
      data: barData.map(item => item.level),
      name: '经验水平',
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      name: '指标值',
      min: 0,
      max: value => Math.ceil(value.max * 1.1) // 自动调整y轴最大值
    },
    series,
    markLine: {
      silent: true,
      symbol: 'none',
      data: markLines,
      label: {
        position: 'start'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: '保存图片'
        },
        dataView: {
          title: '数据视图',
          readOnly: true
        },
        magicType: {
          title: {
            line: '切换为折线图',
            bar: '切换为柱状图'
          },
          type: ['line', 'bar']
        },
        restore: {
          title: '还原'
        }
      },
      right: 20,
      top: 20
    }
  };

  return <ReactECharts 
    option={option} 
    style={{ height: '500px', width: '100%' }} 
    opts={{ renderer: 'svg' }} 
  />;
};

export default ExperienceLevelBarChart;
