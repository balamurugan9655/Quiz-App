import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { PiSpinnerBallFill } from "react-icons/pi";
import { IoDiamond } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLogo from './img/App-logo-png.png';
import { Link } from "react-router-dom";

const Header = ({userName,points}) => 
{

    const hours = new Date().getHours();
    let greeting = "Good Morning";
    if (hours >= 12 && hours < 17) {
        greeting = "Good Afternoon";
    } else if (hours >= 17) {
        greeting = "Good Evening";
    }

    const [show, setShow] = useState(false);

    return(
        <header>
            <Navbar bg="black" expand="lg" className="px-3 text-white">
                <Container fluid>
                    {/* Left Side */}
                    <Navbar.Brand className="text-white">
                        <img src={AppLogo} alt="App Logo" className="me-2" width={50} />
                        <span>Quiz Game</span>
                    </Navbar.Brand>

                    {/* Right Side */}
                    <div className="d-flex align-items-center">
                        <div className="rounded-pill text-info me-3 p-1 ps-2 pe-2" style={{ backgroundColor: "rgb(202, 45, 241)" }}>
                            <IoDiamond className="me-1 fs-5 text-info"/>
                            <span className="text-white fw-bold pe-2"> {points} </span>
                        </div>
                        <Button className="rounded-pill text-white p-0" onClick={() => setShow(true)} style={{ backgroundColor: "rgb(202, 45, 241)" }}>
                            <FaUserCircle size={30} />
                        </Button>
                    </div>
                </Container>
            </Navbar>

            {/* Side Navigation */}
            <Offcanvas show={show} onHide={() => setShow(false)} placement="end" data-bs-theme="dark" style={{ width: "300px" }}>
                <Offcanvas.Header closeButton >
                    <Offcanvas.Title className="d-flex align-items-center">
                        <FaUserCircle size={40} className="me-2 text-white"/>
                        <span className="d-flex flex-column ms-2">
                            <span className="text-white" style={{ color: "rgb(202, 45, 241)" }} >{userName} ,</span>
                            <span className="text-body-tertiary">{greeting}</span>
                        </span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link href="#" className="text-white mb-2" style={{cursor: 'not-allowed'}}> 
                            <FaUserLarge className="me-2 fs-5"/>
                            Profile
                        </Nav.Link>
                        <Nav.Link href="#" className="text-white mb-2" style={{cursor: 'not-allowed'}}>
                            <PiSpinnerBallFill className="me-2 fs-5"/>
                            Spin & Win
                        </Nav.Link>
                        <Nav.Link href="#" className="text-white mb-2" style={{cursor: 'not-allowed'}}>
                            <IoDiamond className="me-2 fs-5"/>
                            Points 
                        </Nav.Link>
                        <Nav.Link href="#" className="text-white mb-2" style={{cursor: 'not-allowed'}}>
                            <MdLeaderboard className="me-2 fs-5"/>
                            Leaderboard</Nav.Link>
                        <Nav.Link href="#" className="text-white mb-2" style={{cursor: 'not-allowed'}}>
                            <IoSettings className="me-2 fs-5"/>
                            Settings
                        </Nav.Link>
                        <Nav.Link as={Link} to="/" href="#" className="text-white mb-2">
                            {/* <IoSettings className="me-2 fs-5"/> */}
                            <IoLogOut className="me-2 fs-5" />
                            Log Out
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </header>
    )
};

export default Header;