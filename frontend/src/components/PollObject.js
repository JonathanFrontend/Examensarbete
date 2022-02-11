import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RESET, UPDATE_POLL } from "./../texts.js"

function PollObject({ pollObject }) {
    const navigate = useNavigate();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const poll = pollObject.attributes;
    console.log("poll", poll);

    const pollInfo = {
        id: pollObject.id,
        title: poll.title,
        author: poll.author.data.attributes,
        description: poll.description,
        tags: poll.tags.data
    }

    function startPoll() {
        if (state.pollInfo.id !== pollObject.id && state.answeredQuestions.length > 0) {
            if (window.confirm("You have an unanswered poll. Do you want to start a new one anyway?")) {
                dispatch({ type: RESET, payload: {} });
                dispatch({ type: UPDATE_POLL, payload: { pollInfo: pollInfo, pollQuestions: poll.questions } });
                navigate(`/poll/${pollObject.id}`);
            }
        } else {
            dispatch({ type: UPDATE_POLL, payload: { pollInfo: pollInfo, pollQuestions: poll.questions } });
            navigate(`/poll/${pollObject.id}`);
        }
    }


    return (
        <div className='poll-object'>
            <div onClick={() => {
                startPoll();
            }}>
                <h4>{pollInfo.title}</h4>
                <h5>{pollInfo.author.username}</h5>
                <h6>{pollInfo.description}</h6>
            </div>
            <div>
                <button onClick={() => {
                    startPoll();
                }}>
                    {"Start"}
                </button>
                <button className='scnd-btn' onClick={(e) => navigate(`/pollresults/${pollInfo.id}`)}>
                    {"Results"}
                </button>
            </div>
        </div>
    );
}

export default PollObject;