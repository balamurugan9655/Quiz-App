import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "./Header";
import AddQuestion from "./AddQuestion";


const CreateQuiz = () => {
    
    const location = useLocation();
    const {userName,points}=location.state || {};
    console.log(userName)

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
            <Header userName={userName} points={points}/>
            <h1 className="text-center pt-3">Create Questions </h1>
            <BackButton />
            <AddQuestion/>
        </div>
    )
}
export default CreateQuiz;