import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_POLL } from "./../texts.js"

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

    return (
        <div className='poll-object'>
            <div onClick={() => {
                dispatch({ type: UPDATE_POLL, payload: { pollInfo: pollInfo, pollQuestions: poll.questions } });
                navigate(`/poll/${pollObject.id}`);
            }}>
                <h4>{pollInfo.title}</h4>
                <h5>{pollInfo.author.username}</h5>
                <h6>{pollInfo.description}</h6>
            </div>
            <div>
                <button onClick={() => {
                    dispatch({ type: UPDATE_POLL, payload: { pollInfo: pollInfo, pollQuestions: poll.questions } });
                    navigate(`/poll/${pollObject.id}`);
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