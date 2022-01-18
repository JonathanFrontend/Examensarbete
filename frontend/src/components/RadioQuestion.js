import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_POLL } from '../texts';
//index = question's index; i = options index.
function RadioQuestion({ q, qIndex }) {
    const dispatch = useDispatch();
    const makeId = (a, b, c) => `${a}-${b}-${c}`;

    const poll = useSelector(state => state.poll.poll.questions[qIndex].type.options[oIndex]);

    const radioOnChange = (e, oIndex) => {
        console.log("e", e.target.value, oIndex)
        console.log("poll", poll)

        const updatedPoll = poll.questions[qIndex];
        const updatedQuestion = updatedPoll.type.options[oIndex];
        // dispatch({ type: UPDATE_POLL, payload: { ...state, poll: {...poll, } } });
        console.log("updatedQuestion", updatedQuestion);
    }

    return (
        <div>
            {
                q.type.options.map((o, i) => <div key={i}>
                    <input type={"radio"} value={`${o}`} name={`${qIndex}`} defaultChecked={(i === 0) ? true : false} id={makeId(qIndex, o, i)} onChange={(e) => radioOnChange(e, i)} />
                    <label htmlFor={makeId(qIndex, o, i)}> {o} </label>
                </div>)
            }
        </div>
    );
}

export default RadioQuestion;