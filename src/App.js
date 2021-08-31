
import { Suspense } from 'react';//懒加载模块配合lazy使用
// import { BrowserRouter as Routes } from 'react-router-dom'
import { HashRouter as Routes } from 'react-router-dom'

// import { Spin } from 'antd' 
// import { renderRoutes } from 'react-router-config'
import  { renderRoutes }  from "./router/renderRoutes";
// import logo from './logo.svg';
import './App.css';
import { routes } from "./router";
// import { Button } from 'antd';

function App() {
  return (  
  <div className="App">
    <Routes>
      <Suspense fallback={<div></div>}> 
        {/* 相当于之前的{this.props.children} */}
        {/* 这里的路由不需要权限认证 */}
        {renderRoutes(routes)}
      </Suspense>
    </Routes>
  </div>
  );
}

export default App;
