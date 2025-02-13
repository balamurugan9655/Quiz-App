import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const StartAnswer = ({ points, setPoints }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const defaultLoading = "Fetching Questions... Please wait.";

    
    // Fetch Questions with Caching & Preloading
    useEffect(() => {
        const API_URL = "https://json-server-api-2owl.onrender.com/questions";
        const fetchQuestions = async () => {
            
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                data.sort((a, b) => a.id - b.id); // Sort questions by ID
                setQuestions(data);
                localStorage.setItem("questions", JSON.stringify(data));
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
            setLoading(false);
        };
        fetchQuestions();

        const cachedData = localStorage.getItem("questions");
            if (cachedData) {
                setQuestions(JSON.parse(cachedData));
                setLoading(false);
                return;
            }
    }, []);

    // Handle Answer Selection
    const handleAnswerSelect = (option) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestionIndex]: option,
        }));
    };

    // Handle Quiz Submission
    const handleSubmit = () => {
        let calculatedScore = 0;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] && selectedAnswers[index] === q.answer) {
                calculatedScore += 1;
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
        <Container className="mt-4">
            {loading ? (
                <h4>{defaultLoading}</h4>
            ) : !isSubmitted ? (
                questions.length > 0 && currentQuestionIndex < questions.length ? (
                    <div>
                        {/* Display Current Question */}
                        <h4 className="p-2" style={{ whiteSpace: "pre-wrap" }}>
                            Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex].text}
                        </h4>

                        {/* Display Options */}
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <Button
                                key={index}
                                variant={selectedAnswers[currentQuestionIndex] === option ? "primary" : "outline-primary"}
                                className="d-block w-100 mt-2"
                                onClick={() => handleAnswerSelect(option)}
                            >
                                {option}
                            </Button>
                        ))}

                        {/* Navigation Buttons */}
                        <div className="mt-3 d-flex justify-content-between">
                            <Button
                                variant="secondary"
                                onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
                                disabled={currentQuestionIndex === 0}
                            >
                                Prev Question
                            </Button>
                            {currentQuestionIndex < questions.length - 1 ? (
                                <Button
                                    variant="success"
                                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
                                >
                                    Next Question
                                </Button>
                            ) : (
                                <Button variant="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <h4>No Questions Available</h4>
                )
            ) : (
                // Show Results After Submission
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
                                const userAnswer = selectedAnswers[index] || "Not Answered";
                                const isCorrect = userAnswer === q.answer;

                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{q.text}</td>
                                        <td>{userAnswer}</td>
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
    );
};

export default StartAnswer;
