import React, { useState} from "react";
import AppLogo from './img/App-logo-png.png';
import { Form, Button, Container, Card } from "react-bootstrap";
import Layout from "./Layout";

const Login = () => {
  const [signup, setSignup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "Student",
    password: "",
  });

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAccess, setUserAccess] = useState("");

  const storageData = (formData) => {
    if (formData) {
      localStorage.setItem("userData", JSON.stringify(formData));
    }
  };

  const submitButton = (e) => {
    e.preventDefault();
    
    // Validation for "Master" user
    if (formData.userType === "Master" && formData.password !== "admin" && formData.password !== "bala") {
      alert("Invalid password! Please enter 'admin' or 'bala'.");
      return;
    }

    setSignup(true);
    setUserName(formData.name);
    setUserEmail(formData.email);
    setUserAccess(formData.userType);
    storageData(formData);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "userType" && value === "Master") {
      setShowPassword(true);
    } else if (name === "userType" && value === "Student") {
      setShowPassword(false);
    }
  };

  //  Enable Button Only if Conditions are Met
  const isSubmitEnabled =
    formData.userType === "Student" ||
    (formData.userType === "Master" && (formData.password === "admin" || formData.password === "bala"));

  return (
    <>
      {signup ? (
        <>
          <Layout userName={userName} userEmail={userEmail} userAccess={userAccess} />
        </>
      ) : (
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Card style={{ width: "25rem" }} className="p-4 shadow-lg">
            <img src={AppLogo} alt="App-Logo" className="w-50 ms-auto me-auto" />
            <h2 className="ms-auto me-auto">Quiz Game</h2>
            <Form onSubmit={submitButton}>
              <Form.Group className="mb-3">
                <Form.Label>Name :</Form.Label>
                <Form.Control type="name" name="name" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email :</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="me-2">Select User Type : </Form.Label>
                <Form.Check inline type="radio" label="Student" name="userType" value="Student" checked={formData.userType === "Student"} onChange={handleChange} />
                <Form.Check inline type="radio" label="Master" name="userType" value="Master" checked={formData.userType === "Master"} onChange={handleChange} />
              </Form.Group>
              {showPassword && (
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Enter Your Password" value={formData.password} onChange={handleChange} required />
                </Form.Group>
              )}
              <Button variant="primary" type="submit" className="w-100" disabled={!isSubmitEnabled}>
                Signup
              </Button>
            </Form>
          </Card>
        </Container>
      )}
    </>
  );
};

export default Login;
