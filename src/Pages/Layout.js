import Header from "./Header";
import Contant from "./Contant";
import AppLogo from './img/App-logo-png.png';
import { useEffect, useState } from "react";

const Layout = ({userName, userEmail, userAccess}) => {
    
    const [userData , setUserData] = useState({
        userName: userName || 'empty' ,
        userEmail:userEmail || 'empty' ,
        userAccess:userAccess || 'empty'
    });

    useEffect(()=> {
        const getData = JSON.parse(localStorage.getItem('userData'));
        if(getData) {
            setUserData(getData)
            // console.log(getData)
        }
    },[]);

    // console.log(userData.name)
      

    const [points , setPoints] = useState(100);
    const [wins , setWins] = useState(
        Math.floor(Math.random()*100 + 20)
    )
    
    return(
        <>
            <Header userName={userData.name} points={points} /> 
            <Contant userName={userData.name} userEmail={userData.email} userAccess={userData.userType} points={points} setPoints={setPoints} wins={wins} setWins={setWins} AppLogo={AppLogo} />
        </>
    )
};

export default Layout;