import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Routes , Route } from 'react-router-dom';
// import Example from './Pages/Example';
import CreateQuiz from './Pages/CreateQuiz';
import StartQuiz from './Pages/StartQuiz';
import Layout from './Pages/Layout';
import Header from './Pages/Header';
import Contant from './Pages/Contant';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/layout" element={<Layout/>}/>
        <Route path="/header" element={<Header/>}/>
        <Route path="/contant" element={<Contant/>}/>
        <Route path="/createQuiz" element={<CreateQuiz/>}/>
        <Route path="/startQuiz" element={<StartQuiz/>}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

