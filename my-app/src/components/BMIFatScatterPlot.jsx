import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function BMIFatScatterPlot({ data }) {
  // 预处理数据
  const processedData = data.map(item => {
    const bmi = parseFloat(item.BMI);
    const fat = parseFloat(item.Fat_Percentage);
    const isHealthyBMI = bmi >= 18.5 && bmi <= 24.9;
    
    return {
      x: bmi,
      y: fat,
      gender: item.Gender,
      isHealthyBMI,
      label: `BMI: ${bmi.toFixed(1)}, Fat: ${fat.toFixed(1)}%`
    };
  }).filter(item => item.x >= 10 && item.y >= 5); // 过滤异常值

  // 按性别和健康状态分组
  const healthyMale = processedData.filter(item => item.gender === 'Male' && item.isHealthyBMI);
  const unhealthyMale = processedData.filter(item => item.gender === 'Male' && !item.isHealthyBMI);
  const healthyFemale = processedData.filter(item => item.gender === 'Female' && item.isHealthyBMI);
  const unhealthyFemale = processedData.filter(item => item.gender === 'Female' && !item.isHealthyBMI);

  const chartData = {
    datasets: [
      {
        label: 'Male (Healthy BMI)',
        data: healthyMale,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointStyle: 'circle',
        borderWidth: 1
      },
      {
        label: 'Male (Unhealthy BMI)',
        data: unhealthyMale,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointStyle: 'triangle',
        borderWidth: 1
      },
      {
        label: 'Female (Healthy BMI)',
        data: healthyFemale,
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointStyle: 'circle',
        borderWidth: 1
      },
      {
        label: 'Female (Unhealthy BMI)',
        data: unhealthyFemale,
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointStyle: 'triangle',
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'BMI',
          font: {
            weight: 'bold'
          }
        },
        min: 10,
        max: 40
      },
      y: {
        title: {
          display: true,
          text: 'Body Fat Percentage (%)',
          font: {
            weight: 'bold'
          }
        },
        min: 5,
        max: 40
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.raw.label;
          }
        }
      },
      title: {
        display: true,
        text: 'BMI与体脂率关系',
        font: {
          size: 16
        }
      },
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xMin: 18.5,
            xMax: 24.9,
            backgroundColor: 'rgba(144, 238, 144, 0.2)',
            borderColor: 'rgba(0, 128, 0, 0.5)',
            borderWidth: 1
          },
          line1: {
            type: 'line',
            xMin: 18.5,
            xMax: 18.5,
            yMin: 5,
            yMax: 40,
            borderColor: 'green',
            borderWidth: 1,
            borderDash: [6, 6]
          },
          line2: {
            type: 'line',
            xMin: 24.9,
            xMax: 24.9,
            yMin: 5,
            yMax: 40,
            borderColor: 'green',
            borderWidth: 1,
            borderDash: [6, 6]
          }
        }
      }
    }
  };

  return <Scatter data={chartData} options={options} />;
}