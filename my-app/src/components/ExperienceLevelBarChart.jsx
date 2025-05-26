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
      BMI: levelData.reduce((sum, item) => sum + parseFloat(item.BMI), 0) / count,
      Resting_BPM: levelData.reduce((sum, item) => sum + parseInt(item.Resting_BPM), 0) / count,
      Max_BPM: levelData.reduce((sum, item) => sum + parseInt(item.Max_BPM), 0) / count,
      count
    };
  }).filter(Boolean);

  // 指标配置
  const indicators = [
    { 
      name: 'BMI', 
      color: '#5e6ec1', 
      maxRef: 25,
      idealRange: [18.5, 24.9] 
    },
    { 
      name: '静息心率', 
      color: '#9bcb7e', 
      maxRef: 100,
      idealRange: [60, 100] 
    },
    { 
      name: '最大心率', 
      color: '#f1cb68', 
      maxRef: null,
      idealRange: null 
    }
  ];

  // 生成系列数据
  const series = indicators.map(indicator => ({
    name: indicator.name,
    type: 'bar',
    data: barData.map(item => ({
      value: item[indicator.name === '静息心率' ? 'Resting_BPM' : 
                 indicator.name === '最大心率' ? 'Max_BPM' : 'BMI'],
      itemStyle: {
        color: indicator.color,
        borderRadius: [4, 4, 0, 0]
      }
    })),
    label: {
      show: true,
      position: 'top',
      formatter: params => params.value.toFixed(1),
      color: '#333',
      fontSize: 12,
      fontWeight: 'bold'
    },
    barWidth: '30%',
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffsetY: 2
      }
    }
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
        color: indicator.color,
        fontSize: 12
      }
    }));

  // 生成理想范围区域
  const markAreas = indicators
    .filter(indicator => indicator.idealRange)
    .map(indicator => ({
      name: `${indicator.name}理想范围`,
      type: 'line',
      markArea: {
        silent: true,
        itemStyle: {
          color: 'rgba(100, 200, 100, 0.1)',
          borderWidth: 1,
          borderColor: 'rgba(100, 200, 100, 0.3)'
        },
        data: [[
          {
            yAxis: indicator.idealRange[0],
            label: {
              show: true,
              position: 'inside',
              formatter: `${indicator.name}理想范围`,
              color: '#666',
              fontSize: 10
            }
          },
          {
            yAxis: indicator.idealRange[1]
          }
        ]]
      },
      data: []
    }));

  const option = {
    title: {
      text: '不同经验水平健康指标对比',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(150, 150, 150, 0.1)'
        }
      },
      formatter: params => {
        const level = params[0].axisValue;
        const levelData = barData.find(item => item.level === level);
        let tooltip = `
          <div style="font-weight:bold;color:#333;margin-bottom:8px">${level}水平</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="color:#666">样本数:</span>
            <span style="font-weight:bold">${levelData.count}</span>
          </div>
        `;
        
        params.forEach(param => {
          tooltip += `
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="color:#666">${param.seriesName}:</span>
              <span style="font-weight:bold;color:${param.color}">${param.value.toFixed(1)}</span>
            </div>
          `;
        });
        
        return tooltip;
      }
    },
    legend: {
      data: indicators.map(item => item.name),
      top: 40,
      itemWidth: 20,
      itemHeight: 12,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      top: 90,
      bottom: 90,
      left: 60,
      right: 40
    },
    xAxis: {
      type: 'category',
      data: barData.map(item => item.level),
      name: '经验水平',
      nameLocation: 'middle',
      nameGap: 25,
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      name: '指标值',
      nameLocation: 'middle',
      nameGap: 40,
      min: 0,
      max: value => Math.ceil(value.max * 1.2),
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLabel: {
        fontSize: 12
      }
    },
    series: [...series, ...markAreas],
    markLine: {
      silent: true,
      symbol: 'none',
      data: markLines,
      label: {
        position: 'start',
        fontSize: 12
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: '保存图片',
          pixelRatio: 2,
          type: 'png'
        },
        dataView: {
          title: '数据视图',
          readOnly: true,
          lang: ['数据视图', '关闭', '刷新']
        },
        magicType: {
          title: {
            line: '折线图',
            bar: '柱状图'
          },
          type: ['line', 'bar'],
          option: {
            series: series.map(s => ({ ...s, type: 'line' }))
          }
        },
        restore: {
          title: '还原'
        }
      },
      right: 20,
      top: 20,
      itemSize: 16
    },
    animationDuration: 1500,
    animationEasing: 'elasticOut'
  };

  return (
    <ReactECharts 
      option={option} 
      style={{ 
        height: '550px', 
        width: '100%',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.1)',
        borderRadius: '8px',
        padding: '15px'
      }}
      opts={{ 
        renderer: 'svg',
        devicePixelRatio: 2
      }}
      onEvents={{
        'click': params => {
          console.log('图表点击:', params);
        },
        'legendselectchanged': params => {
          console.log('图例选择变化:', params);
        }
      }}
    />
  );
};

export default ExperienceLevelBarChart;
