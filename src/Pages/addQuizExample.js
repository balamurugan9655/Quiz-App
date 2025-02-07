import React, { useState, useEffect } from "react";
import { Container, Card, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AddQuestion = () => {
    const [questions, setQuestions] = useState(() => {
        const storedQuestions = localStorage.getItem("quizQuestions");
        return storedQuestions ? JSON.parse(storedQuestions) : [
            { id: 1, question: "What is the capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 0, explanation: "Paris is the capital of France." },
            { id: 2, question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1, explanation: "2 + 2 equals 4." },
            { id: 3, question: "Which is the largest planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 2, explanation: "Jupiter is the largest planet in our solar system." },
            { id: 4, question: "Who wrote 'Hamlet'?", answers: ["Shakespeare", "Hemingway", "Tolkien", "Dickens"], correct: 0, explanation: "William Shakespeare wrote 'Hamlet'." }
        ];
    });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showExplanation, setShowExplanation] = useState(Array(questions.length).fill(false)); // Track which explanation is visible
    const [resultIndex, setResultIndex] = useState(0); // Track which question's result is currently being shown

    useEffect(() => {
        localStorage.setItem("quizQuestions", JSON.stringify(questions));
    }, [questions]);

    const handleAnswerSelect = (index) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestionIndex] = index;
        setSelectedAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers([]);
        setShowResults(false);
        setResultIndex(0); // Reset the result index
        setShowExplanation(Array(questions.length).fill(false)); // Reset explanation visibility
    };

    const toggleExplanation = (index) => {
        const updatedExplanations = [...showExplanation];
        updatedExplanations[index] = !updatedExplanations[index]; // Toggle explanation visibility for this question
        setShowExplanation(updatedExplanations);
      
    };

    const handleNextResult = () => {
        if (resultIndex < questions.length - 1) {
            setResultIndex(resultIndex + 1);
        }
    };

    const handlePreviousResult = () => {
        if (resultIndex > 0) {
            setResultIndex(resultIndex - 1);
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4">
                <h2 className="text-center">Advanced Quiz App</h2>
                {!showResults ? (
                    <>
                        <h4>Q{questions[currentQuestionIndex].id}: {questions[currentQuestionIndex].text}</h4>
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
                        <div className="mt-3">
                            <Button className="btn btn-secondary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</Button>
                            <Button className="btn btn-primary" onClick={handleNext} disabled={selectedAnswers[currentQuestionIndex] === undefined}>Next</Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <h4>Quiz Completed!</h4>
                        <p>Your Score: {selectedAnswers.filter((answer, index) => answer === questions[index].correct).length} / {questions.length}</p>
                        
                        {/* Show result for each question one by one */}
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Your Answer</th>
                                    <th>Correct Answer</th>
                                    <th>Explanation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions[resultIndex] && (
                                    <tr key={questions[resultIndex].id}>
                                        <td>{questions[resultIndex].question}</td>
                                        <td className={selectedAnswers[resultIndex] === questions[resultIndex].correct ? "bg-success text-white" : "bg-danger text-white"}>
                                            {questions[resultIndex].answers[selectedAnswers[resultIndex]]}
                                        </td>
                                        <td>{questions[resultIndex].answers[questions[resultIndex].correct]}</td>
                                        <td>
                                            <Button variant="link" onClick={() => toggleExplanation(resultIndex)}>
                                                Explain
                                            </Button>
                                            {showExplanation[resultIndex] && <p className="mt-2 bg-info text-black">{questions[resultIndex].explanation}</p>}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                        <div className="mt-3">
                            <Button className="btn btn-secondary" onClick={handlePreviousResult} disabled={resultIndex === 0}>Previous Question</Button>
                            <Button className="btn btn-primary" onClick={handleNextResult} disabled={resultIndex === questions.length - 1}>Next Question</Button>
                        </div>
                        <Button className="btn btn-success mt-3" onClick={restartQuiz}>Restart Quiz</Button>
                    </div>
                )}
            </Card>
        </Container>
    );
};

export default AddQuestion;
