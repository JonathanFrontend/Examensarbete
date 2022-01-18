import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_POLL } from "./../texts.js"

function PollObject({ poll }) {
    const navigate = useNavigate();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    return (
        <div onClick={() => {
            let ls = localStorage.getItem("chosenPoll");
            dispatch({ type: UPDATE_POLL, payload: { ...state, poll: poll } });
            navigate(`/poll`);
        }}>
            <h4>{poll.title}</h4>
            <h6>{poll.author}</h6>
        </div>
    );
}

export default PollObject;