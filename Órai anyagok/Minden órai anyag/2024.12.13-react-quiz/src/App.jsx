import { useState } from "react";

const questions = [
    {
        "question": "Hogy hívják Franciaország fővárosát?",
        "options": [
            "London", "Párizs", "Berlin", "Budapest"
        ],
        "answer": "Párizs"
    },
    {
        "question": "Melyik nyelvvel lehet szebbé tenni weboldalakat?",
        "options": [
            "HTML", "CSS", "JS", "C++"
        ],
        "answer": "CSS"
    },
    {
        "question": "Mennyi 2 + 2?",
        "options": [
            "3", "4", "8", "10"
        ],
        "answer": "4"
    }
];

function Question({ question, options, onAnswerSelected }) {
    return <>
        <h2>{question}</h2>

        {options.map(option => {
            return <>
                <label>
                    <input type="radio" name="answer" onClick={() => onAnswerSelected(option)} />{option}
                </label>
            </>
        })}
    </>
}

export default () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    function adjustIndex(selectedAnswer) {
        if(selectedAnswer == questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    if (!questions[currentQuestionIndex]) {
        return <>
            <h1>Végeztél a kvízzel</h1>
            <h3>Pontszámod: {score}/{questions.length}</h3>
        </>
    }

    const { question, options } = questions[currentQuestionIndex];

    return <>
        <h1>Kvíz</h1>

        <Question question={question} options={options} onAnswerSelected={adjustIndex} />
    </>
}