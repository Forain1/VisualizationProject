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
    const groupData = data.filter(item => {
      const age = parseInt(item.Age);
      return age >= range.min && age <= range.max;
    });
    const count = groupData.length;
    if (count === 0) return null;

    // 计算平均静息心率
    const avg = groupData.reduce((sum, item) => sum + parseInt(item.Resting_BPM), 0) / count;
    
    // 计算标准差
    const stdDev = Math.sqrt(
      groupData.reduce((sum, item) => sum + Math.pow(parseInt(item.Resting_BPM) - avg, 2), 0) / count
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

  // 计算整体平均心率
  const overallAvg = data.reduce((sum, item) => sum + parseInt(item.Resting_BPM), 0) / data.length;

  const option = {
    title: {
      text: '年龄与静息心率分析',
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
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: (params) => {
        const data = params[0].data;
        return `
          <div style="font-weight:bold;color:#333;margin-bottom:8px">${data.group}年龄组</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="color:#666">平均心率:</span>
            <span style="font-weight:bold;color:#c23531">${data.avg} BPM</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="color:#666">置信区间:</span>
            <span style="font-weight:bold;color:#2f4554">${data.lower}-${data.upper} BPM</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:8px">
            <span style="color:#666">样本数:</span>
            <span style="font-weight:bold">${data.count}</span>
          </div>
        `;
      }
    },
    legend: {
      data: ['平均心率', '置信区间', '健康范围', '整体平均'],
      top: 40,
      itemWidth: 25,
      itemHeight: 14,
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
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
          title: {
            zoom: '区域缩放',
            back: '还原缩放'
          }
        },
        magicType: {
          type: ['line', 'bar'],
          title: {
            line: '切换折线图',
            bar: '切换柱状图'
          }
        },
        restore: {
          title: '还原'
        },
        saveAsImage: {
          title: '保存图片',
          pixelRatio: 2,
          type: 'png'
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
        bottom: 30,
        start: 0,
        end: 100,
        handleStyle: {
          color: '#2f4554'
        }
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        zoomOnMouseWheel: 'shift',
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
      name: '静息心率 (BPM)',
      nameLocation: 'middle',
      nameGap: 40,
      min: value => Math.max(40, Math.floor(value.min - 10)),
      max: value => Math.min(120, Math.ceil(value.max + 10)),
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
    series: [
      {
        name: '平均心率',
        type: 'line',
        data: lineData.map(item => ({
          ...item,
          value: item.avg
        })),
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: '#c23531'
        },
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 5,
          shadowOffsetY: 3
        },
        label: {
          show: true,
          formatter: ({ data }) => data.avg.toFixed(1),
          position: 'top',
          color: '#c23531',
          fontSize: 12,
          fontWeight: 'bold'
        },
        emphasis: {
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
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
          formatter: ({ data }) => `${data.lower.toFixed(1)}-${data.upper.toFixed(1)}`,
          color: '#2f4554',
          fontSize: 10,
          backgroundColor: 'rgba(255,255,255,0.7)',
          padding: [2, 4],
          borderRadius: 4
        },
        tooltip: {
          show: false
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
                color: 'rgba(144, 238, 144, 0.2)',
                borderWidth: 1,
                borderColor: 'rgba(100, 200, 100, 0.3)'
              }
            },
            {
              yAxis: 100
            }
          ]],
          label: {
            show: true,
            position: 'inside',
            formatter: '健康心率范围',
            color: '#666',
            fontSize: 12,
            fontWeight: 'bold'
          }
        },
        lineStyle: {
          opacity: 0
        }
      },
      {
        name: '整体平均',
        type: 'line',
        markLine: {
          silent: true,
          data: [{
            yAxis: overallAvg,
            name: '整体平均',
            label: {
              position: 'end',
              formatter: '整体平均: {c} BPM',
              color: '#666',
              fontSize: 12
            },
            lineStyle: {
              color: '#d48265',
              type: 'dashed',
              width: 2
            }
          }]
        },
        data: []
      }
    ],
    animationDuration: 1500,
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
      return idx * 200;
    }
  };

  return (
    <ReactECharts 
      option={option} 
      style={{ 
        height: '100%', 
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
          console.log('图表点击事件:', params);
        },
        'legendselectchanged': params => {
          console.log('图例选择变化:', params);
        },
        'datazoom': params => {
          console.log('缩放事件:', params);
        }
      }}
    />
  );
};

export default AgeBPMLineChart;
