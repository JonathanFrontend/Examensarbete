import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AnswerObj from '../blueprints/AnswerClass';
import { makeId } from '../blueprints/makeId';
import { ANSWER_QUESTION, UPDATE_POLL } from '../texts';

//index = question's index; i = options index.
function RatingQuestion({ q, qIndex }) {
    const dispatch = useDispatch();
    const answeredQuestions = useSelector(state => state.answeredQuestions)
    const [rating, setRating] = useState(1);
    let stars = [1, 2, 3, 4, 5];
    const starPercentage = (rating / 5) * 100 + '%';

    const onChange = (e, oIndex) => {

        const answer = new AnswerObj(q.question, e.target.value, "rating", qIndex);

        dispatch({
            type: ANSWER_QUESTION,
            payload: { ...answer }
        });
    }

    return (
        <div>
            <div className='star-container'>
                {/* <div className="star-outer">
                    <div className="star-inner" style={{ width: starPercentage }}></div>
                </div> */}
                <div className='star-outer'>
                    {
                        stars.map((r, index) => {
                            const id = makeId(qIndex, r, index);

                            return (
                                <span key={index} className='star-bg'>
                                    <input type={"radio"} name={`${qIndex}`} className='star-rating' value={r} id={id} onChange={(e) => {
                                        setRating(e.target.value)
                                        onChange(e, index)
                                    }} />
                                    <label className='star' htmlFor={id} style={{ color: (r <= rating) ? "#FFA500" : "#c4c4c4" }}> <i className="fas fa-star"></i> </label>
                                </span>
                            )
                        })
                    }
                </div>
                {/* {
                    stars.map((rating, index) => {
                        const id = makeId(qIndex, rating, index);

                        return (
                            <span key={index}>
                                <input type={"radio"} name={`${qIndex}`} className='star-rating' value={rating} id={id} />
                                <label className='star' htmlFor={id}> <i className="fas fa-star"></i> </label>
                            </span>
                        )
                    })
                } */}
            </div>
            {
                /*  q.options.map((o, i) => <div key={i}>
                     <input type={"radio"} value={`${o}`} name={`${qIndex}`} id={makeId(qIndex, o, i)} onChange={(e) => radioOnChange(e, i)} />
                     <label htmlFor={makeId(qIndex, o, i)}> {o} </label>
                 </div>) */
            }
        </div>
    );
}

export default RatingQuestion;