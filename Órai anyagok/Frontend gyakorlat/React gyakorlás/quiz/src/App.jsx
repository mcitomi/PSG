import React, { useState } from "react";

const questions = [
    {
        question: "Hogy hívják Franciaország fővárosát?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "Melyik nyelvvel lehet 'szebbé tenni' weboldalakat?",
        options: ["HTML", "CSS", "JavaScript", "React"],
        answer: "CSS",
    },
    {
        question: "Mennyi 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
    },
];

function Question({ question, options, onAnswerSelected }) {
    return (
        <div>
            <h2>{question}</h2>
            <input
                type="radio"
                name="answer"
                value={options[0]}
                onChange={() => onAnswerSelected(options[0])}
            />
            <label>{options[0]}</label>
            <input
                type="radio"
                name="answer"
                value={options[1]}
                onChange={() => onAnswerSelected(options[1])}
            />
            <label>{options[1]}</label>
            <input
                type="radio"
                name="answer"
                value={options[2]}
                onChange={() => onAnswerSelected(options[2])}
            />
            <label>{options[2]}</label>
            <input
                type="radio"
                name="answer"
                value={options[3]}
                onChange={() => onAnswerSelected(options[3])}
            />
            <label>{options[3]}</label>
        </div>
    );
}

export default function App() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    function handleAnswerSelected(selectedAnswer) {
        if (selectedAnswer == questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const { question, options } = questions[currentQuestionIndex];

    return (
        <Question
            question={question}
            options={options}
            onAnswerSelected={handleAnswerSelected}
        />
    );
}
