import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Answer } from '../blueprints/Answer';
import { makeId } from '../blueprints/makeId';
import { ANSWER_QUESTION, UPDATE_POLL } from '../texts';

//index = question's index; i = options index.
function RadioQuestion({ q, qIndex }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: ANSWER_QUESTION,
            payload: {
                typeOfQuestion: "radio",
                answer: "",
                indexOfQuestion: qIndex,
                question: q.question,
                indexOfPickedOption: undefined,
            }
        });
    }, []);

    const onChange = (e, oIndex) => {

        // const answer = new Answer(e.target.value, q.question, e.target.type, qIndex);
        // console.log("answer", answer);

        dispatch({
            type: ANSWER_QUESTION,
            payload: {
                typeOfQuestion: "radio",
                answer: e.target.value,
                indexOfQuestion: qIndex,
                question: q.question,
                indexOfPickedOption: oIndex,
            }
        });
        // console.log("poll", poll)

        // const updatedPoll = poll.questions[qIndex];
        // const updatedQuestion = updatedPoll.type.options[oIndex];
        // dispatch({ type: UPDATE_POLL, payload: { ...state, poll: {...poll, } } });
        // console.log("updatedQuestion", updatedQuestion);
    }

    return (
        <div>
            {
                q.options.map((o, i) => <div key={i}>
                    <input type={"radio"} value={`${o}`} name={`${qIndex}`} id={makeId(qIndex, o, i)} onChange={(e) => onChange(e, i)} />
                    <label htmlFor={makeId(qIndex, o, i)}> {o} </label>
                </div>)
            }
        </div>
    );
}

export default RadioQuestion;