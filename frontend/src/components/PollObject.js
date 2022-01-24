import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_POLL } from "./../texts.js"

function PollObject({ pollObject }) {
    const navigate = useNavigate();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    console.log("state", state)
    const poll = pollObject.attributes;

    const pollInfo = {
        id: pollObject.id,
        title: poll.title,
        author: poll.users_permissions_user.data.attributes,
        description: poll.description,
        tags: poll.tags.data
    }

    return (
        <div onClick={() => {
            // let ls = localStorage.getItem("chosenPoll");
            dispatch({ type: UPDATE_POLL, payload: { pollInfo: pollInfo, pollQuestions: poll.questions } });
            navigate(`/poll`);
        }} className='poll-object'>
            <h4>{pollInfo.title}</h4>
            <h5>{pollInfo.author.username}</h5>
            <h6>{pollInfo.description}</h6>
        </div>
    );
}

export default PollObject;