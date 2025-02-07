/*import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import ProfileImg from './img/profile-img.png';
import { IoMdAddCircle } from "react-icons/io";
import { IoCreateSharp } from "react-icons/io5";
import { GrAchievement } from "react-icons/gr";
// import CreateQuiz from './CreateQuiz' ;

const Home = ({ userName, points, wins, userEmail, userAccess }) => {
    return (
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
                                <Card.Text>
                                    <h6>Email: {userEmail}</h6>
                                    <h6>User Type: {userAccess}</h6>
                                    <h6>Points: {points}</h6>
                                    <h6>Win: {wins} Trophies</h6>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
            <Container className="d-flex justify-content-evenly p-2">
                <Link to="/start-quiz" className="text-decoration-none">
                    <Button variant="primary" className="me-2 p-4 p-md-5 d-flex flex-column fw-bold">
                        <IoMdAddCircle className="fs-1" />
                        Start Quiz
                    </Button>
                </Link>
                <Link to="/createQuiz" className="text-decoration-none">
                    <Button variant="primary" className="me-2 p-4 p-md-5 d-flex flex-column fw-bold">
                        <IoCreateSharp className="fs-1" />
                        Create Quiz
                    </Button>
                </Link>
                <Link to="/achievements" className="text-decoration-none">
                    <Button variant="primary" className="me-2 p-4 p-md-5 d-flex flex-column fw-bold">
                        <GrAchievement className="fs-1" />
                        Achievements
                    </Button>
                </Link>
            </Container>
        </main>
    );
};

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button variant="secondary" className="mt-3" onClick={() => navigate(-1)}>
            Back
        </Button>
    );
};


// const StartQuiz = () => (
//     <Container className="text-center mt-5">
//         <h2>Start Quiz Page</h2>
//         <BackButton />
//     </Container>
// );

// const CreateQuiz = () => (
//     <Container className="text-center mt-5">
//         <h2>Create Quiz Page</h2>
//         <BackButton />
//     </Container>
// );

const Achievements = () => (
    <Container className="text-center mt-5">
        <h2>Achievements Page</h2>
        <BackButton />
    </Container>
);

const Example = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home userName="John Doe" points={100} wins={5} userEmail="john@example.com" userAccess="Admin" />} />
                <Route path="/start-quiz" element={<CreateQuiz />} />
                <Route path="/createQuiz" element={<CreateQuiz />} />
                <Route path="/achievements" element={<Achievements />} />
            </Routes>
        </Router>
    );
};

export default Example;*/
