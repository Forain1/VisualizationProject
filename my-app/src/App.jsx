import Dashboard from "./components/Dashboard";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/Fotterbar";
import gymBg from './assets/gym.jpg';
function App() {

     
    return(<>
      <style>{`
    html, body, #root {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }
  `}</style>
    
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${gymBg})`,  // 背景图地址
        backgroundSize: 'cover',                      // 图片铺满容器
        backgroundPosition: 'center center',          // 居中显示
        backgroundRepeat: 'no-repeat',                 // 不重复
        color: '#fff',                                // 文字颜色（根据背景调整）
        boxSizing: 'border-box',
      }}
    >
        <HeaderBar/>
          <div style={{ marginTop: '20px', padding:'10px'}}>
       <Dashboard />
    </div>

        <FooterBar />
    </div>
      
    </>
    ) ;




}

export default App;