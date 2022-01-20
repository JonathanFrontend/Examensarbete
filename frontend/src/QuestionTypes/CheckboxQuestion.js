import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Answer } from '../blueprints/Answer';
import { makeId } from '../blueprints/makeId';
import { ANSWER_QUESTION, UPDATE_POLL, NOTA } from '../texts';

//index = question's index; i = options index.

function CheckboxQuestion({ q, qIndex }) {
    const [payload, setPayload] = useState({});
    const [answerArr, setAnswerArr] = useState([]);
    const firstRender = useRef(false);
    const dispatch = useDispatch();

    const state = useSelector(state => state);
    console.log("state", state)

    useEffect(() => {
        if (firstRender.current) {
            console.log("useEffect", answerArr);
            dispatch({
                type: ANSWER_QUESTION,
                payload: {
                    typeOfQuestion: "checkbox",
                    answer: answerArr,
                    indexOfQuestion: qIndex,
                    question: q.question,
                    //indexOfPickedOption: i,
                }
            });
        } else {
            firstRender.current = true;
        }
    }, [answerArr])

    const onChange = (e, oIndex) => {

        // const answer = new Answer(e.target.value, q.question, e.target.type, qIndex);
        // console.log("answer", answer);
        console.log(e.target.checked);
        console.log("before useEffect", answerArr);


        if (e.target.checked) {
            if (e.target.value === NOTA) {
                setAnswerArr([e.target.value]);
            } else {
                //let answerArrCopy = [];
                let answerArrCopy = [...answerArr];

                for (let i = 0; i < answerArrCopy.length; i++) {
                    if (answerArrCopy[i] === NOTA) {
                        answerArrCopy = [];
                        break;
                    }
                }

                answerArrCopy.push(e.target.value);

                setAnswerArr(answerArrCopy);
            }
        } else if (!e.target.checked) {
            let answerArrCopy = [...answerArr];

            for (let i = 0; i < answerArrCopy.length; i++) {
                if (answerArrCopy[i] === e.target.value) {
                    answerArrCopy.splice(i, 1);
                }
            }
            setAnswerArr(answerArrCopy);
        }
    }

    return (
        <div>
            {
                q.options.map((o, i) => <div key={i}>
                    <input type={"checkbox"} value={`${o}`} checked={state.answeredQuestions} name={`${qIndex}`} id={makeId(qIndex, o, i)} onChange={(e) => {

                        onChange(e, i);
                    }} />
                    <label htmlFor={makeId(qIndex, o, i)}> {o} </label>
                </div>)
            }
        </div>
    );
}

export default CheckboxQuestion;