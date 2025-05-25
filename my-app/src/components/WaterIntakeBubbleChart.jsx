// import { Scatter } from 'react-chartjs-2';
// import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

// export function WaterIntakeBubbleChart({ data }) {
//   // 预处理数据：按0.5L间隔分箱
//   const processedData = data.map(item => {
//     // const waterIntake = parseFloat(item.Water_Intake);
//     // const duration = parseFloat(item.Session_Duration);
//     // const calories = parseFloat(item.Calories_Burned);
//     const waterIntake = parseFloat(item["Water_Intake (liters)"]);
//     const duration = parseFloat(item["Session_Duration (hours)"]);
//     const calories = parseFloat(item.Calories_Burned);

    
//     return {
//       x: Math.round(waterIntake * 2) / 2, // 四舍五入到最近的0.5
//       y: duration,
//       r: Math.sqrt(calories) * 0.8, // 调整气泡大小
//       gender: item.Gender,
//       calories: calories
//     };
//   });

//   // 按性别分组
//   const maleData = processedData.filter(item => item.gender === 'Male');
//   const femaleData = processedData.filter(item => item.gender === 'Female');

//   const chartData = {
//     datasets: [
//       {
//         label: 'Male',
//         data: maleData,
//         backgroundColor: 'rgba(54, 162, 235, 0.7)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1
//       },
//       {
//         label: 'Female',
//         data: femaleData,
//         backgroundColor: 'rgba(255, 99, 132, 0.7)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1
//       }
//     ]
//   };

//   const options = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Water Intake (L)',
//           font: {
//             weight: 'bold'
//           }
//         },
//         ticks: {
//           stepSize: 0.5
//         }
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Session Duration (hours)',
//           font: {
//             weight: 'bold'
//           }
//         },
//         min: 0,
//         max: Math.max(...processedData.map(item => item.y)) + 0.5
//       }
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             const data = context.raw;
//             return [
//               `Water: ${data.x}L`,
//               `Duration: ${data.y.toFixed(1)} hours`,
//               `Calories: ${data.calories.toFixed(0)} kcal`
//             ];
//           }
//         }
//       },
//       title: {
//         display: true,
//         text: '水分摄入与运动表现',
//         font: {
//           size: 16
//         }
//       }
//     }
//   };

//   return <Scatter data={chartData} options={options} />;
// }

import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export function WaterIntakeBubbleChart({ data }) {
  // 提取 calories 数组，做归一化用
  const caloriesArr = data.map(item => parseFloat(item.Calories_Burned) || 0);
  const calMin = Math.min(...caloriesArr);
  const calMax = Math.max(...caloriesArr);

  // 归一化函数，映射到 [4, 20] 的气泡半径范围
  const normalizeRadius = (cal) => {
    if (calMax === calMin) return 2; // 防止除0，统一大小
    const minRadius = 5;
    const maxRadius = 500;
    return minRadius + ((cal - calMin) / (calMax - calMin)) * (maxRadius - minRadius);
  };

  const processedData = data.map(item => {
    const waterIntake = parseFloat(item["Water_Intake (liters)"]) || 0;
    const duration = parseFloat(item["Session_Duration (hours)"]) || 0;
    const calories = parseFloat(item.Calories_Burned) || 0;

    return {
      //x: Math.round(waterIntake * 2) / 2, // 四舍五入到0.5L
      x: waterIntake,
      y: duration,
      r: normalizeRadius(calories), // 归一化后的半径
      gender: item.Gender,
      calories
    };
  });

  const maleData = processedData.filter(item => item.gender === 'Male');
  const femaleData = processedData.filter(item => item.gender === 'Female');

  const chartData = {
    datasets: [
      {
        label: 'Male',
        data: maleData,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Female',
        data: femaleData,
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Water Intake (L)',
          font: { weight: 'bold' }
        },
        ticks: { stepSize: 0.1 }
      },
      y: {
        title: {
          display: true,
          text: 'Session Duration (hours)',
          font: { weight: 'bold' }
        },
        min: 0.5,
        max: Math.max(...processedData.map(d => d.y))
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label(ctx) {
            const d = ctx.raw;
            return [
              `Water: ${d.x}L`,
              `Duration: ${d.y.toFixed(1)} hours`,
              `Calories: ${d.calories.toFixed(0)} kcal`
            ];
          }
        }
      },
      title: {
        display: true,
        text: '水分摄入与运动表现',
        font: { size: 16 }
      }
    }
  };

  return <Scatter data={chartData} options={options} />;
}
