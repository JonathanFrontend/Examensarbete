import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AnswerObj from '../blueprints/AnswerClass';
import { makeId } from '../blueprints/makeId';
import { ANSWER_QUESTION, UPDATE_POLL } from '../texts';

//index = question's index; i = options index.
function RadioQuestion({ q, qIndex }) {
    const dispatch = useDispatch();
    const aq = useSelector(state => state.answeredQuestions);

    useEffect(() => {
        if (!((aq && aq[qIndex]) && aq[qIndex].answer)) {
            const answer = new AnswerObj(q.question, "", "radio", qIndex);
            dispatch({
                type: ANSWER_QUESTION,
                payload: { ...answer }
            });
        }
    }, []);

    const onChange = (e, oIndex) => {
        const answer = new AnswerObj(q.question, e.target.value, "radio", qIndex);
        console.log("answer", AnswerObj, answer);

        dispatch({
            type: ANSWER_QUESTION,
            payload: { ...answer }
        });
    }

    const isAnswered = (aq, o) => {
        if (aq.answer === o) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div>
            {
                q.options.map((o, i) => <div key={i}>
                    <input
                        type={"radio"}
                        defaultChecked={(aq && aq[qIndex]) ? isAnswered(aq[qIndex], o) : false}
                        value={`${o}`}
                        name={`${qIndex}`}
                        id={makeId(qIndex, o, i)}
                        onChange={(e) => onChange(e, i)} />
                    <label htmlFor={makeId(qIndex, o, i)}> {o} </label>
                </div>)
            }
        </div>
    );
}

export default RadioQuestion;