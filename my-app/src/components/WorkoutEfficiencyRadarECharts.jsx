import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

export function WorkoutEfficiencyRadarECharts({ data }) {
  const chartOption = useMemo(() => {
    const workoutTypes = [...new Set(data.map(item => item.Workout_Type))];

    const aggregated = workoutTypes.map(type => {
      const items = data.filter(d => d.Workout_Type === type);
      const avg = (key) =>
        items.reduce((sum, i) => sum + parseFloat(i[key] || 0), 0) / items.length;

      return {
        name: type,
        values: [
          avg('Calories_Burned'),
          avg('Max_BPM'),
          avg('Avg_BPM'),
          avg('Session_Duration (hours)')
        ]
      };
    });

    // 计算每个维度的最小值和最大值
    const dimensionCount = 4;
    const mins = Array(dimensionCount).fill(Infinity);
    const maxs = Array(dimensionCount).fill(-Infinity);

    aggregated.forEach(a => {
      a.values.forEach((v, i) => {
        if (v < mins[i]) mins[i] = v;
        if (v > maxs[i]) maxs[i] = v;
      });
    });

    // 设置一个padding比例，比如10%
    const paddingRatio = 0.1;

    // 计算indicator，min为min - 10%范围，但不小于0，max为max + 10%范围
    const indicator = [
      'Calories Burned',
      'Max BPM',
      'Avg BPM',
      'Duration (h)'
    ].map((name, i) => {
      const minVal = Math.max(0, mins[i] - (maxs[i] - mins[i]) * paddingRatio);
      const maxVal = maxs[i] + (maxs[i] - mins[i]) * paddingRatio;
      return {
        name,
        min: minVal,
        max: maxVal
      };
    });

    return {
      title: {
        text: '运动类型效率分析',
        left: 'center',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: 30,
        data: aggregated.map(a => a.name)
      },
      radar: {
        indicator,
        shape: 'circle',
        radius: '60%'
      },
      series: [
        {
          type: 'radar',
          data: aggregated.map(a => ({
            value: a.values,
            name: a.name
          }))
        }
      ]
    };
  }, [data]);

  return <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />;
}
