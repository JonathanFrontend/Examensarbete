import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AnswerObj from '../blueprints/AnswerClass';
import { makeId } from '../blueprints/makeId';
import { ANSWER_QUESTION, UPDATE_POLL } from '../texts';

//index = question's index; i = options index.
function RatingQuestion({ q, qIndex }) {
    const dispatch = useDispatch();
    const aq = useSelector(state => state.answeredQuestions)
    const [rating, setRating] = useState((aq && aq[qIndex] && !isNaN(aq[qIndex].answer)) ? parseInt(aq[qIndex].answer) : 0);
    let stars = [1, 2, 3, 4, 5];

    const onChange = (e, oIndex) => {
        const answer = new AnswerObj(q.question, e.target.value, "rating", qIndex);
        dispatch({
            type: ANSWER_QUESTION,
            payload: { ...answer }
        });
    }

    const isAnswered = (aq, o) => {
        if (parseInt(aq.answer) === o) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div>
            <div className='star-container'>
                {
                    stars.map((r, index) => {
                        const id = makeId(qIndex, r, index);
                        return (
                            <span key={index} className='star-bg'>
                                <input type={"radio"}
                                    name={`${qIndex}`}
                                    className='star-rating'
                                    value={r}
                                    id={id}
                                    defaultChecked={(aq && aq[qIndex]) ? isAnswered(aq[qIndex], r) : false}
                                    onChange={(e) => {
                                        setRating(e.target.value)
                                        onChange(e, index)
                                    }} />
                                <label className='star' htmlFor={id} style={{ color: (r <= rating) ? "#FFA500" : "#c4c4c4" }}> <i className="fas fa-star"></i> </label>
                            </span>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default RatingQuestion;