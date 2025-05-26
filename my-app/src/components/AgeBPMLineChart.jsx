import React from 'react';
import ReactECharts from 'echarts-for-react';

const AgeBPMLineChart = ({ data }) => {
  // 定义年龄分组范围和对应的显示标签
  const ageGroups = {
    '18-25': { min: 18, max: 25 },
    '26-35': { min: 26, max: 35 },
    '36-45': { min: 36, max: 45 },
    '46-55': { min: 46, max: 55 },
    '56+': { min: 56, max: 100 }
  };

  // 处理数据：计算每个年龄组的平均心率、置信区间等统计信息
  const lineData = Object.entries(ageGroups).map(([group, range]) => {
    // 过滤出当前年龄组的数据
    const groupData = data.filter(item => item.Age >= range.min && item.Age <= range.max);
    const count = groupData.length;
    if (count === 0) return null;

    // 计算平均静息心率
    const avg = groupData.reduce((sum, item) => sum + item.Resting_BPM, 0) / count;
    
    // 计算标准差
    const stdDev = Math.sqrt(
      groupData.reduce((sum, item) => sum + Math.pow(item.Resting_BPM - avg, 2), 0) / count
    );
    
    // 计算95%置信区间
    const marginOfError = 1.96 * (stdDev / Math.sqrt(count));

    return {
      group,
      avg: Number(avg.toFixed(1)),
      lower: Number((avg - marginOfError).toFixed(1)),
      upper: Number((avg + marginOfError).toFixed(1)),
      count
    };
  }).filter(Boolean);

  const option = {
    title: {
      text: '年龄与静息心率',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: (params) => {
        const data = params[0].data;
        return `
          <div style="font-weight:bold;margin-bottom:5px">${data.group}年龄组</div>
          <div style="display:flex;justify-content:space-between">
            <span>平均心率:</span>
            <span style="font-weight:bold">${data.avg} BPM</span>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span>置信区间:</span>
            <span style="font-weight:bold">${data.lower}-${data.upper} BPM</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:5px">
            <span>样本数:</span>
            <span style="font-weight:bold">${data.count}</span>
          </div>
        `;
      }
    },
    legend: {
      data: ['平均心率', '置信区间', '健康范围'],
      top: 30,
      itemWidth: 25,
      itemHeight: 14
    },
    grid: {
      top: 80,
      bottom: 80
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
          title: {
            zoom: '区域缩放',
            back: '还原缩放'
          }
        },
        brush: {
          type: ['rect', 'clear'],
          title: {
            rect: '框选',
            clear: '清除选择'
          }
        },
        saveAsImage: {
          title: '保存图片',
          pixelRatio: 2
        },
        restore: {
          title: '还原'
        }
      },
      right: 20,
      top: 20
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        height: 20,
        bottom: 20,
        start: 0,
        end: 100
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true
      }
    ],
    xAxis: {
      type: 'category',
      data: lineData.map(item => item.group),
      name: '年龄组',
      nameLocation: 'middle',
      nameGap: 30,
      axisPointer: {
        snap: true
      }
    },
    yAxis: {
      type: 'value',
      name: '静息心率 (BPM)',
      min: value => Math.floor(value.min - 5),
      max: value => Math.ceil(value.max + 5),
      axisPointer: {
        snap: true
      }
    },
    series: [
      {
        name: '平均心率',
        type: 'line',
        data: lineData.map(item => ({
          ...item,  // 直接展开所有属性
          value: item.avg  // 确保value属性存在
        })),
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: '#c23531'
        },
        lineStyle: {
          width: 3
        },
        label: {
          show: true,
          formatter: ({ data }) => data.avg,
          position: 'top',
          color: '#c23531',
          fontSize: 12
        },
        emphasis: {
          itemStyle: {
            borderWidth: 2,
            borderColor: '#000',
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      {
        name: '置信区间',
        type: 'line',
        data: lineData.map(item => ({
          group: item.group,
          value: [item.group, item.lower, item.upper],
          lower: item.lower,
          upper: item.upper
        })),
        lineStyle: {
          opacity: 0
        },
        areaStyle: {
          color: 'rgba(47, 69, 84, 0.3)'
        },
        symbol: 'none',
        stack: 'confidence',
        label: {
          show: true,
          position: 'bottom',
          formatter: ({ data }) => `${data.lower}-${data.upper}`,
          color: '#2f4554',
          fontSize: 10
        }
      },
      {
        name: '健康范围',
        type: 'line',
        markArea: {
          silent: true,
          data: [[
            {
              yAxis: 60,
              itemStyle: {
                color: 'rgba(144, 238, 144, 0.2)'
              }
            },
            {
              yAxis: 100
            }
          ]],
          label: {
            show: true,
            position: 'inside',
            formatter: '健康范围',
            color: '#666',
            fontSize: 12
          }
        },
        lineStyle: {
          opacity: 0
        }
      }
    ],
    animationDuration: 1000,
    animationEasing: 'elasticOut'
  };

  return (
    <ReactECharts 
      option={option} 
      style={{ height: '500px', width: '100%' }}
      opts={{ renderer: 'svg' }}
      onEvents={{
        'click': params => {
          console.log('图表点击事件:', params);
        },
        'legendselectchanged': params => {
          console.log('图例选择变化:', params);
        }
      }}
    />
  );
};

export default AgeBPMLineChart;
