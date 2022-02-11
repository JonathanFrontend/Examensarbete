import React from 'react';
import RadioQuestion from '../QuestionTypes/RadioQuestion';
import RatingQuestion from '../QuestionTypes/RatingQuestion';
import CheckboxQuestion from '../QuestionTypes/CheckboxQuestion';
import TextQuestion from '../QuestionTypes/TextQuestion';
import { useSelector } from 'react-redux';

function Scanner({ q, qIndex }) {
    // console.log("q", q)
    switch (q.type) {
        case "radio":
            return <RadioQuestion q={q} qIndex={qIndex} />;
        case "checkbox":
            return <CheckboxQuestion q={q} qIndex={qIndex} />;
        case "rating":
            return <RatingQuestion q={q} qIndex={qIndex} />;
        case "text":
            return <TextQuestion q={q} qIndex={qIndex} />;
        default:
            return <TextQuestion q={q} qIndex={qIndex} />;
    }
}

function Question({ question, index, unanswered }) {
    const aq = useSelector(state => state.answeredQuestions);
    const findIfUnanswered = unanswered.find(q => q.indexOfQuestion === index);

    return (
        <section className={(findIfUnanswered && (findIfUnanswered.indexOfQuestion === index)) ? "unanswered" : ""}>
            <h3>{question.question}</h3>
            {
                <Scanner q={question} qIndex={index} />
            }
        </section>
    );
}

export default Question;