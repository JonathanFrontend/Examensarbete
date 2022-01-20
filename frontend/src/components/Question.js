import React from 'react';
import RadioQuestion from '../QuestionTypes/RadioQuestion';
import RatingQuestion from '../QuestionTypes/RatingQuestion';
import CheckboxQuestion from '../QuestionTypes/CheckboxQuestion';

function Question({ question, index }) {
    console.log("question", question, index);

    const ratingLoop = (n) => {
        let stars = "";
        for (let i = 1; i <= n; i++) {

        }
    }

    function Scanner({ q, qIndex }) {
        console.log("q", q)
        switch (q.type) {
            case "radio":
                return <RadioQuestion q={q} qIndex={qIndex} />;
            case "checkbox":
                return <CheckboxQuestion q={q} qIndex={qIndex} />;
            case "rating":
                return <RatingQuestion q={q} qIndex={qIndex} />;
            case "text":
                return <div>
                    <input type={"text"} />
                </div>;
            default:
                return <div>
                    <input type={"text"} />
                </div>;
        }
    }
    return (
        <section>
            <h3>{question.question}</h3>
            {
                <Scanner q={question} qIndex={index} />
            }
        </section>
    );
}

export default Question;