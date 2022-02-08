import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import AnswerObj from '../blueprints/AnswerClass';
import { makeId } from '../blueprints/makeId';
import { ANSWER_QUESTION, UPDATE_POLL } from '../texts';

//index = question's index; i = options index.
function RatingQuestion({ q, qIndex }) {
    const dispatch = useDispatch();

    const radioOnChange = (e, oIndex) => {

        const answer = new AnswerObj(q.question, e.target.value, "rating", qIndex);
        console.log("answer", answer);

        dispatch({
            type: ANSWER_QUESTION,
            payload: { ...answer }
        });
        // console.log("poll", poll)
        /* 
        {
            answer: e.target.value,
            indexOfQuestion: qIndex,
            typeOfQuestion: "radio",
            question: q.question,
            indexOfPickedOption: oIndex,
        }
        */
        // const updatedPoll = poll.questions[qIndex];
        // const updatedQuestion = updatedPoll.type.options[oIndex];
        // dispatch({ type: UPDATE_POLL, payload: { ...state, poll: {...poll, } } });
        // console.log("updatedQuestion", updatedQuestion);
    }

    return (
        <div>
            <input type={"radio"} name={`${qIndex}`} className='star-rating' value={1} id='1' />
            <label htmlFor={'1'}> * </label>

            <input type={"radio"} name={`${qIndex}`} className='star-rating' value={2} id='2' />
            <label htmlFor={'2'}> * </label>

            <input type={"radio"} name={`${qIndex}`} className='star-rating' value={3} id='3' />
            <label htmlFor={'3'}> * </label>

            <input type={"radio"} name={`${qIndex}`} className='star-rating' value={4} id='4' />
            <label htmlFor={'4'}> * </label>

            <input type={"radio"} name={`${qIndex}`} className='star-rating' value={5} id='5' />
            <label htmlFor={'5'}> * </label>
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