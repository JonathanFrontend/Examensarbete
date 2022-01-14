import React from 'react';
import { useNavigate } from "react-router-dom";

function PollObject({ poll }) {
    const navigate = useNavigate();
    console.log("poll", poll)
    return (
        <div onClick={() => {

            navigate(`/poll`);
        }}>
            <h4>{poll.title}</h4>
            <h6>{poll.author}</h6>
        </div>
    );
}

export default PollObject;