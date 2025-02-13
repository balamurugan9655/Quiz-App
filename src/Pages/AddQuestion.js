import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = 'https://json-server-api-2owl.onrender.com/questions';

const AddQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const [newOptions, setNewOptions] = useState(["", "", "", ""]);
    const [newAnswer, setNewAnswer] = useState("");
    const [defaultLoading, setDefaultLoading] = useState(true); // For preloading

    // Fetch Questions from API with Caching
    useEffect(() => {
        const cachedData = sessionStorage.getItem("questions");

        if (cachedData) {
            setQuestions(JSON.parse(cachedData));
            setDefaultLoading(false);
        }

        const fetchQuestions = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setQuestions(data);
                sessionStorage.setItem("questions", JSON.stringify(data)); // Cache data
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setDefaultLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // Get Next Question ID Dynamically
    const getNextId = () => {
        return questions.length > 0 ? Math.max(...questions.map(q => q.id), 0) + 1 : 1;
    };

    // Handle Option Input Change
    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newOptions];
        updatedOptions[index] = value;
        setNewOptions(updatedOptions);
    };

    // Add New Question to API
    const addQuestion = async () => {
        if (!newQuestion.trim() || newOptions.some(opt => !opt.trim()) || !newAnswer.trim()) {
            alert("Please fill all fields correctly.");
            return;
        }

        const newQuestionObj = {
            id: getNextId(),
            text: newQuestion,
            options: newOptions,
            answer: newAnswer
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newQuestionObj)
            });

            if (!response.ok) throw new Error("Failed to add question");

            const addedQuestion = await response.json();
            const updatedQuestions = [...questions, addedQuestion];
            setQuestions(updatedQuestions);
            sessionStorage.setItem("questions", JSON.stringify(updatedQuestions)); // Update Cache

            // Reset Form
            setNewQuestion("");
            setNewOptions(["", "", "", ""]);
            setNewAnswer("");

            alert("Question Added Successfully!");
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    // Delete Question from API
    const deleteQuestion = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

            if (!response.ok) throw new Error("Failed to delete question");

            const updatedQuestions = questions.filter(q => q.id !== id);
            setQuestions(updatedQuestions);
            sessionStorage.setItem("questions", JSON.stringify(updatedQuestions)); // Update Cache

            alert("Question Deleted Successfully!");
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    return (
        <Container className="mt-4">
            <Card className="mb-4 p-3">
                <h5 className="text-center">Add New Question</h5>

                {/* Question Input */}
                <Form.Group className="mb-4">
                    <Form.Label>{getNextId()}. Question</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter Question"
                        style={{ height: '100px', whiteSpace: 'pre-wrap' }}
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                </Form.Group>

                {/* Options Input */}
                <div className="row mb-4">
                    {newOptions.map((opt, index) => (
                        <Form.Group key={index} className="col-3">
                            <Form.Label>Option {index + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                        </Form.Group>
                    ))}
                </div>

                {/* Correct Answer Selection */}
                <Form.Group className="mb-4">
                    <Form.Label>Correct Answer</Form.Label>
                    <Form.Control
                        as="select"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                    >
                        <option value="">Select Correct Answer</option>
                        {newOptions.map((opt, index) => (
                            <option key={index} value={opt}>{opt}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {/* Add Question Button */}
                <Button variant="success" className="mt-2" onClick={addQuestion}>
                    Add Question
                </Button>
            </Card>

            {/* Display Questions */}
            {defaultLoading ? (
                <h4 className="text-center">Loading Questions...</h4>
            ) : (
                <ListGroup>
                    {questions.map((q, index) => (
                        <ListGroup.Item key={q.id}>
                            <div className="d-flex justify-content-between align-items-center">
                                <strong style={{ whiteSpace: "pre-wrap" }}>
                                    {index + 1}. {q.text}
                                </strong>
                                <Button variant="danger" size="sm" onClick={() => deleteQuestion(q.id)}>
                                    Delete
                                </Button>
                            </div>
                            <Form>
                                <ol className="row mb-3">
                                    {q.options.map((option, idx) => (
                                        <li key={idx} className="col-3">{option}</li>
                                    ))}
                                </ol>
                                <p>
                                    <strong>Correct Answer: </strong>
                                    <span className="text-success fw-bolder">{q.answer}</span>
                                </p>
                            </Form>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};

export default AddQuestion;
