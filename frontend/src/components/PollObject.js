import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_POLL } from "./../texts.js"

function PollObject({ pollObject }) {
    const navigate = useNavigate();
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const poll = pollObject.attributes;

    const pollInfo = {
        id: pollObject.id,
        title: poll.title,
        author: poll.users_permissions_user.data.attributes,
        description: poll.description,
        tags: poll.tags.data
    }

    return (
        <div className='poll-object'>
            <div onClick={() => {
                // let ls = localStorage.getItem("chosenPoll");
                dispatch({ type: UPDATE_POLL, payload: { pollInfo: pollInfo, pollQuestions: poll.questions } });
                navigate(`/poll`);
            }}>
                <h4>{pollInfo.title}</h4>
                <h5>{pollInfo.author.username}</h5>
                <h6>{pollInfo.description}</h6>
            </div>
            <div>
                <button onClick={(e) => navigate(`/pollresults/${pollInfo.id}`)}>
                    Results (so far)
                </button>
            </div>
        </div>
    );
}

export default PollObject;