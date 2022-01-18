import React from 'react';
import RadioQuestion from './RadioQuestion';

function Question({ question, index }) {
    console.log("question", question, index);

    const ratingLoop = (n) => {
        let stars = "";
        for (let i = 1; i <= n; i++) {

        }
    }

    function TheQuestion({ q, i }) {
        switch (q.type.type) {
            case "radio":

                return <RadioQuestion q={q} qIndex={i} />;
            case "checkbox":
                return <div>
                    {
                        q.type.options.map((o, i) => <div key={i}>
                            <input type={"checkbox"} name={`${index}`} id={`${o}`} />
                            <label htmlFor={`${o}`}> {o} </label>
                        </div>)
                    }
                </div>;
            case "axis":
                return <div>
                    {
                        q.type.options.map((o, i) => <div key={i}>
                            <input type={"radio"} name={`${index}`} id={`${o}`} />
                            <label htmlFor={`${o}`}> {o} </label>
                        </div>)
                    }
                </div>;
            case "text":
                return <div>
                    <input type={"text"} />
                </div>;
            case "rating":
                return <div >
                    {/* {
                        ratingLoop(10)
                    } */}
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
                <TheQuestion q={question} i={index} />
            }
        </section>
    );
}

export default Question;