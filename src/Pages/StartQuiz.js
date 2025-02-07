// import { Button } from "react-bootstrap";
import { useNavigate,useLocation } from "react-router-dom";
import Header from "./Header";
import { Button} from "react-bootstrap";
import React from "react";
import StartAnsware from "./StartAnsware";



const StartQuiz = () => {

    const location = useLocation();
    const {userName,points}=location.state || {};


        const BackButton = () => {
            const navigate = useNavigate();
            const gotoback = () => {
                navigate("/layout")
            }
            return (
                <Button variant="secondary" className="m-2" onClick={gotoback}>
                    Back To Home
                </Button>
            );
        };

        
    return(
        <div>
            <Header userName={userName} points={points} /> 
            <h1 className="text-center mt-2"> Start Test </h1>
            <BackButton/>
            <StartAnsware />
        </div>
       
    )
};
export default StartQuiz;