import React from 'react';
import Login from './Pages/Login';
import Animation from './Pages/img/loading-gif.gif';
import AppLogo from './Pages/img/App-logo-png.png';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';


function App() {

  const [ loading, setLoading ] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // Simulating loading time
  
      return () => clearTimeout(timer);
    }, []);


  return (
    <>
      
      {loading ? (
          <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <img src={AppLogo} alt="App Logo" className="img w-50"/>
            <img src={Animation} alt="Loading..." className="loading-gif" />
          </Container>
        ) : (
          <Login/> 
        )}

    </>
  );
}

export default App;
