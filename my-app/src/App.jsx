import { useState,useEffect } from 'react'
import Papa from 'papaparse'


function App() {
  const [csvData,setCsvData] = useState([]);
  useEffect(()=>{
    fetch('/dataset.csv')
    .then(res=>res.text())
    .then((text)=>{
      Papa.parse(text,{
        header:true,
        skipEmptyLines:true,
        complete:(res,file)=>{
          setCsvData(res.data);
        }
      })
    })
  })

    return (
    <div>
      <h2>CSV 数据预览：</h2>
      <pre>{JSON.stringify(csvData, null, 2)}</pre>
    </div>
  );

}

export default App
