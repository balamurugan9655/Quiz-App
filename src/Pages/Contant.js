import React from "react";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import ProfileImg from './img/profile-img.png';
import { IoMdAddCircle } from "react-icons/io";
import { IoCreateSharp } from "react-icons/io5";
import { GrAchievement } from "react-icons/gr";
import { Link} from "react-router-dom";



const Contant = ({userName,points,setPoints,userEmail,userAccess,wins,setWins}) => 
{
     
    return(
        <main>
            <Container className="d-flex justify-content-center">
                <Card className="mb-3 mt-4" style={{ maxWidth: '540px' }}>
                    <Row className="g-0">
                        <Col className="col-4">
                        <Card.Img variant="top" src={ProfileImg} className="img-fluid rounded-start" alt="profile img" />
                        </Col>
                        <Col className="col-8">
                        <Card.Body>
                            <Card.Title>{userName}</Card.Title>
                            <Card.Text><strong>Email :</strong> {userEmail}</Card.Text>
                            <Card.Text><strong>User Type :</strong> {userAccess}</Card.Text>
                            <Card.Text><strong>Points :</strong> {points}</Card.Text>
                            <Card.Text><strong>Win :</strong> {wins} Trophies</Card.Text>
                        </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
            <Container className="d-flex justify-content-evenly p-2">
                <Link to="/startQuiz" state={{userName,points}} className="text-decoration-none" >
                    <Button variant="primary" className="me-2 p-4 p-md-5 d-flex flex-column justify-content-sm-start justify-content-md-center fw-bold">
                    <IoMdAddCircle className="fs-1 ms-auto me-auto"/>
                    Start Quiz
                    </Button>
                </Link>
                <Link to={userAccess === "Student" ? "#" : "/createQuiz"} state={{userName,points}} className="text-decoration-none" style={userAccess === "Student" ? {cursor : "not-allowed"} : {cursor : "pointer"}  }>
                    <Button variant="primary" disabled={userAccess === "Student"} className="me-2 p-4 p-md-5 d-flex flex-column justify-content-sm-start justify-content-md-center fw-bold"  state={{userName,points}}>
                    <IoCreateSharp className="fs-1 ms-auto me-auto"/>
                    Create Quiz
                    </Button>
                </Link>
                <Button disabled variant="primary" className="me-2 p-4 p-md-5 d-flex flex-column justify-content-sm-start justify-content-md-center fw-bold" style={{cursor : "not-allowed"}}>
                   <GrAchievement className="fs-1 ms-auto me-auto"/>
                   Achievements
                </Button>
            </Container>
        </main>
    )
}

export default Contant;