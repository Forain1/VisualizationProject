// import { useState,useEffect } from 'react'
// import Papa from 'papaparse'


// function App() {
//   const [csvData,setCsvData] = useState([]);
//   useEffect(()=>{
//     fetch('/dataset.csv')
//     .then(res=>res.text())
//     .then((text)=>{
//       Papa.parse(text,{
//         header:true,
//         skipEmptyLines:true,
//         complete:(res,file)=>{
//           setCsvData(res.data);
//         }
//       })
//     })
//   })

//     return (
//     <div>
//       <h2>CSV 数据预览：</h2>
//       <pre>{JSON.stringify(csvData, null, 2)}</pre>
//     </div>
//   );

// }

// export default App

// import { useState, useEffect } from 'react';
// import Papa from 'papaparse';
// import { WorkoutEfficiencyRadar } from './components/WorkoutEfficiencyRadar';
// import { WaterIntakeBubbleChart } from './components/WaterIntakeBubbleChart';
// import { BMIFatScatterPlot } from './components/BMIFatScatterPlot';

// function App() {
//   const [csvData, setCsvData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('/dataset.csv')
//       .then(res => res.text())
//       .then((text) => {
//         Papa.parse(text, {
//           header: true,
//           skipEmptyLines: true,
//           complete: (res) => {
//             // 过滤无效数据
//             const validData = res.data.filter(item => 
//               item.Session_Duration && 
//               item.Calories_Burned && 
//               item.Max_BPM && 
//               item.Water_Intake &&
//               item.BMI &&
//               item.Fat_Percentage
//             );
//             setCsvData(validData);
//             setLoading(false);
//           },
//           error: (err) => {
//             setError(err.message);
//             setLoading(false);
//           }
//         });
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []); // 空依赖数组确保只运行一次

//   if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>加载数据中...</div>;
//   if (error) return <div style={{ padding: '20px', color: 'red' }}>错误: {error}</div>;
//   if (csvData.length === 0) return <div style={{ padding: '20px' }}>没有可用的数据</div>;

//   return (
//     <div className="app" style={{ 
//       padding: '20px', 
//       maxWidth: '1200px', 
//       margin: '0 auto',
//       fontFamily: 'Arial, sans-serif'
//     }}>
//       <h1 style={{ 
//         textAlign: 'center', 
//         marginBottom: '30px',
//         color: '#333'
//       }}>
//         运动数据分析仪表板
//       </h1>
      
//       {/* 第一行：雷达图和气泡图 */}
//       <div style={{ 
//         display: 'grid', 
//         gridTemplateColumns: '1fr 1fr', 
//         gap: '30px',
//         marginBottom: '30px'
//       }}>
//         {/* 雷达图卡片 */}
//         <div style={{ 
//           backgroundColor: 'white', 
//           padding: '20px', 
//           borderRadius: '8px', 
//           boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//         }}>
//           <h2 style={{ marginTop: 0, color: '#444' }}>运动类型效率分析</h2>
//           <div style={{ height: '400px' }}>
//             <WorkoutEfficiencyRadar data={csvData} />
//           </div>
//           <p style={{ fontSize: '14px', color: '#666' }}>
//             比较不同运动类型在卡路里消耗、心率变化和训练时长方面的效率
//           </p>
//         </div>
        
//         {/* 气泡图卡片 */}
//         <div style={{ 
//           backgroundColor: 'white', 
//           padding: '20px', 
//           borderRadius: '8px', 
//           boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//         }}>
//           <h2 style={{ marginTop: 0, color: '#444' }}>水分摄入与运动表现</h2>
//           <div style={{ height: '400px' }}>
//             <WaterIntakeBubbleChart data={csvData} />
//           </div>
//           <p style={{ fontSize: '14px', color: '#666' }}>
//             分析水分摄入量与运动时长、卡路里消耗的关系
//           </p>
//         </div>
//       </div>
      
//       {/* 第二行：散点图（全宽） */}
//       <div style={{ 
//         backgroundColor: 'white', 
//         padding: '20px', 
//         borderRadius: '8px', 
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         marginBottom: '30px'
//       }}>
//         <h2 style={{ marginTop: 0, color: '#444' }}>BMI与体脂率关系</h2>
//         <div style={{ height: '500px' }}>
//           <BMIFatScatterPlot data={csvData} />
//         </div>
//         <p style={{ fontSize: '14px', color: '#666' }}>
//           展示BMI与体脂百分比的相关性，绿色区域表示健康BMI范围(18.5-24.9)
//         </p>
//       </div>
      
//       {/* 数据信息小卡片 */}
//       <div style={{ 
//         backgroundColor: '#f8f9fa', 
//         padding: '15px', 
//         borderRadius: '8px',
//         fontSize: '14px',
//         color: '#666'
//       }}>
//         <strong>数据集信息：</strong> 共 {csvData.length} 条记录 | 
//         最后更新: {new Date().toLocaleDateString()}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { WorkoutEfficiencyRadarECharts } from './components/WorkoutEfficiencyRadarECharts';
import { WaterIntakeBubbleChart } from './components/WaterIntakeBubbleChart';
import { BMIFatScatterPlot } from './components/BMIFatScatterPlot';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/dataset.csv')
      .then(res => res.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (res) => {
            console.log('原始数据:', res.data); // 调试用
            
            // 更宽松的数据验证
            const validData = res.data.filter(item => 
              item && 
              item.Age && 
              item.Gender && 
              item.Workout_Type
            );
            
            console.log('有效数据:', validData); // 调试用
            setCsvData(validData);
            setLoading(false);
          },
          error: (err) => {
            console.error('CSV解析错误:', err);
            setError(err.message);
            setLoading(false);
          }
        });
      })
      .catch(err => {
        console.error('数据加载错误:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>加载数据中...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>错误: {error}</div>;
  
  // 调试信息
  console.log('渲染时数据:', csvData);
  
  return (
    <div className="app" style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        color: '#333'
      }}>
        运动数据分析仪表板
      </h1>
      
      {/* 调试信息 - 正式发布时可移除 */}
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '10px', 
        marginBottom: '20px',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>调试信息:</strong> 已加载 {csvData.length} 条记录
      </div>
      
      {csvData.length > 0 ? (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '30px',
            marginBottom: '30px'
          }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ marginTop: 0, color: '#444' }}>运动类型效率分析</h2>
              <div style={{ height: '400px' }}>
                <WorkoutEfficiencyRadarECharts data={csvData} />
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ marginTop: 0, color: '#444' }}>水分摄入与运动表现</h2>
              <div style={{ height: '400px' }}>
                <WaterIntakeBubbleChart data={csvData} />
              </div>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginTop: 0, color: '#444' }}>BMI与体脂率关系</h2>
            <div style={{ height: '500px' }}>
              <BMIFatScatterPlot data={csvData} />
            </div>
          </div>
        </>
      ) : (
        <div style={{ 
          backgroundColor: '#fff8e1', 
          padding: '20px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>没有可用的数据</h3>
          <p>CSV文件已加载，但没有符合条件的数据记录</p>
          <p>请检查: </p>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>CSV文件格式是否正确</li>
            <li>字段名称是否匹配</li>
            <li>浏览器控制台是否有错误</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;