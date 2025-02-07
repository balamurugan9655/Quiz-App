import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "Student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container mt-5">
      <h2>User Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select User Type</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Student"
              name="userType"
              value="Student"
              checked={formData.userType === "Student"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              label="Master"
              name="userType"
              value="Master"
              checked={formData.userType === "Master"}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    </div>
  );
};

export default UserForm;
