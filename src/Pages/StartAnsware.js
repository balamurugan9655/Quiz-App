import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const StartAnsware = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);



    // Load questions from localStorage on component mount
    useEffect(() => {
        const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
        setQuestions(storedQuestions);
    }, []);

    // Handle answer selection
    const handleAnswerSelect = (index) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestionIndex]: index,
        }));
    };

    // Handle quiz submission
    const handleSubmit = () => {
        let calculatedScore = 0;
        questions.forEach((q, index) => {
            const userAnswerIndex = selectedAnswers[index];
            if (q.options[userAnswerIndex] === q.answer) {
                calculatedScore += 1; // Increase score for correct answers
            }
        });
        setScore(calculatedScore);
        setIsSubmitted(true);
        
    };

    // Restart Quiz
    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setIsSubmitted(false);
        setScore(0);
    };


    return (
        <Container>
            {/* <h2>Start Test</h2> */}
            <Container className="mt-4">
                {/* Show Quiz if not submitted */}
                {!isSubmitted ? (
                    questions.length > 0 && currentQuestionIndex < questions.length ? (
                        <div>
                            {/* Display Question */}
                            <h4 className="p-2">Q{questions[currentQuestionIndex].id} . {questions[currentQuestionIndex].text}</h4>

                            {/* Display Options as Buttons */}
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <Button
                                    key={index}
                                    variant={selectedAnswers[currentQuestionIndex] === index ? "primary" : "outline-primary"}
                                    className="d-block w-100 mt-2"
                                    onClick={() => handleAnswerSelect(index)}
                                >
                                    {option}
                                </Button>
                            ))}

                            {/* Next Question or Submit */}
                            <div className="mt-3">
                                <Container className="d-flex justify-content-between">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                                        disabled={currentQuestionIndex === 0}
                                    >
                                        Prev Question
                                    </Button>
                                    {currentQuestionIndex < questions.length - 1 ? (
                                        <Button 
                                            variant="success" 
                                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                                        >
                                            Next Question
                                        </Button>
                                    ) : (
                                        <Button variant="primary" onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                    )}
                                </Container>
                            </div>
                        </div>
                    ) : (
                        <h4>No Questions Available</h4>
                    )
                ) : (
                    // Show Results Table after Submission
                    <div>
                        <h3 className="text-center text-success p-2">Test Results</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Q.No</th>
                                    <th>Question</th>
                                    <th>Your Answer</th>
                                    <th>Correct Answer</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((q, index) => {
                                    const userAnswerIndex = selectedAnswers[index];
                                    const isCorrect = q.options[userAnswerIndex] === q.answer;

                                    return (
                                        <tr key={index}>
                                            <td>{q.id}</td>
                                            <td>{q.text}</td>
                                            <td>{userAnswerIndex !== undefined ? q.options[userAnswerIndex] : "Not Answered"}</td>
                                            <td>{q.answer}</td>
                                            <td style={{ color: isCorrect ? "green" : "red", fontWeight: "bold" }}>
                                                {isCorrect ? "✔ Correct" : "✘ Wrong"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>

                        {/* Show Score */}
                        <h4 className="mt-4">
                            Your Score: <span style={{ color: "blue" }}>{score} / {questions.length}</span>
                        </h4>

                        {/* Restart Button */}
                        <Button variant="outline-primary" className="mt-3" onClick={handleRestart}>
                            Restart Quiz
                        </Button>
                    </div>
                )}
            </Container>
        </Container>
    );
};

export default StartAnsware;
