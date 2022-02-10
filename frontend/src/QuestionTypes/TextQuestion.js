import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AnswerObj from '../blueprints/AnswerClass';
import { makeId } from '../blueprints/makeId';
import { ANSWER_QUESTION, UPDATE_POLL } from '../texts';

//index = question's index; i = options index.
function TextQuestion({ q, qIndex }) {
    const dispatch = useDispatch();
    const aq = useSelector(state => state.answeredQuestions);

    useEffect(() => {
        if (!((aq && aq[qIndex]) && aq[qIndex].answer)) {
            const answer = new AnswerObj(q.question, "", "text", qIndex);
            dispatch({
                type: ANSWER_QUESTION,
                payload: { ...answer }
            });
        }
    }, []);

    const onChange = (e, oIndex) => {
        const answer = new AnswerObj(q.question, e.target.value, "text", qIndex);

        dispatch({
            type: ANSWER_QUESTION,
            payload: { ...answer }
        });
    }

    return (
        <div>
            <input
                type={"text"}
                defaultValue={(aq && aq[qIndex] && aq[qIndex].answer) ? aq[qIndex].answer : ""}
                name={`${qIndex}`}
                onChange={(e) => onChange(e)} />
        </div>
    );
}

export default TextQuestion;