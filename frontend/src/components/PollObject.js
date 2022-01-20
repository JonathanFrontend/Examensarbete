import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_POLL } from "./../texts.js"

function PollObject({ poll }) {
    const navigate = useNavigate();
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const pollInfo = {
        id: poll.id,
        title: poll.title,
        author: poll.author,
        description: poll.description,
        tags: poll.tags
    }

    return (
        <div onClick={() => {
            // let ls = localStorage.getItem("chosenPoll");
            dispatch({ type: UPDATE_POLL, payload: { pollInfo: pollInfo, pollQuestions: poll.questions } });
            navigate(`/poll`);
        }}>
            <h4>{pollInfo.title}</h4>
            <h6>{pollInfo.author}</h6>
        </div>
    );
}

export default PollObject;