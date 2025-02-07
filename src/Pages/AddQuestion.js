import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const AddQuestion = () => {
    const [questions, setQuestions] = useState([]);

    // Load questions from localStorage when the component mounts
    useEffect(() => {
        const storedQuestions = localStorage.getItem("questions");
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        }
    }, []);

    const [newQuestion, setNewQuestion] = useState("");
    const [newOptions, setNewOptions] = useState(["", "", "", ""]);
    const [newAnswer, setNewAnswer] = useState("");

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newOptions];
        updatedOptions[index] = value;
        setNewOptions(updatedOptions);
    };

    const addQuestion = () => {
        if (newQuestion.trim() && newOptions.every(opt => opt.trim()) && newAnswer.trim()) {
            const newQuestionObj = {
                id: questions.length + 1,
                text: newQuestion,
                options: [...newOptions],
                answer: newAnswer
            };
            const updatedQuestions = [...questions, newQuestionObj];
            setQuestions(updatedQuestions);
            localStorage.setItem("questions", JSON.stringify(updatedQuestions)); // Store in localStorage
            setNewQuestion("");
            setNewOptions(["", "", "", ""]);
            setNewAnswer("");
            alert("Question Added")
        }
    };

    const deleteQuestion = (id) => {
        const updatedQuestions = questions.filter(q => q.id !== id);
        setQuestions(updatedQuestions);
        localStorage.setItem("questions", JSON.stringify(updatedQuestions)); // Update localStorage
    };


    return (
        <Container className="mt-4">
            {/* <h2 className="text-center mb-4">Quiz App</h2> */}

            {/* Add New Question */}
            <Card className="mb-4 p-3">
                <h5 className="text-center">Add New Question</h5>
                <Form.Group className="mb-4">
                    <Form.Label> {questions.length+1} . Question</Form.Label>
                    <Form.Control as="textarea" placeholder="New Questions" style={{ height: '100px' }} value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                </Form.Group>

                <div className="row mb-4">
                {newOptions.map((opt, index) => (
                    <Form.Group key={index} className="col-3">
                        <Form.Label>Option {index + 1}</Form.Label>
                        <Form.Control type="text" value={opt} onChange={(e) => handleOptionChange(index, e.target.value)} />
                    </Form.Group>
                ))}
                </div>

                <Form.Group className="mb-4">
                    <Form.Label>Correct Answer</Form.Label>
                    <Form.Control as="select" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)}>
                        <option value="">Select Correct Answer</option>
                        {newOptions.map((opt, index) => (
                            <option key={index} value={opt}>{opt}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="success" className="mt-2" onClick={addQuestion}>Add Question</Button>
            </Card>

            {/* Display Questions */}
            <ListGroup>
                {questions.map((q) => (
                    <ListGroup.Item key={q.id}>
                        {/* <h5 className="text-center">Question List</h5> */}
                        <div className="d-flex justify-content-between align-items-center">
                            <strong> {q.id} . {q.text}</strong>
                            <Button variant="danger" size="sm" onClick={() => deleteQuestion(q.id)}>Delete</Button>
                        </div>
                        <Form>
                            <ol className="row mb-3">
                            {q.options.map((option, index) => (
                                <li key={index} className="col-3"> {option} </li>
                            ))}
                            </ol>
                            <p> <strong>Correct Answer : </strong> <span className="text-success fw-bolder"> {q.answer} </span> </p>
                        </Form>
                            
                    </ListGroup.Item>
                ))}
            </ListGroup>

        </Container>
    );
};

export default AddQuestion;
