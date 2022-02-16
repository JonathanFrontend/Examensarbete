import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RESET, UPDATE_POLL } from "./../texts.js"
import { UserContext } from '../contexts/UserContext.js';

function PollObject({ pollObject }) {
    const [isAnswered, setIsAnswered] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const poll = pollObject.attributes;
    console.log("poll", poll);

    useEffect(() => {
        console.log("poll", poll);
        const findUsersID = poll.answered_polls.data.find(p => {
            if (p.attributes) {
                return p.attributes.UserID === `${user.user.id}`
            }
        });
        console.log("findUsersID", findUsersID);
        if (findUsersID && findUsersID.attributes.UserID === `${user.user.id}`) {
            setIsAnswered(true);
        }
    }, [])

    const pollInfo = {
        id: pollObject.id,
        title: poll.title,
        author: poll.author.data.attributes,
        description: poll.description,
        tags: poll.tags.data,
        pollEndsAt: poll.pollEndsAt
    }

    function startPoll() {
        dispatch({ type: UPDATE_POLL, payload: { pollInfo: pollInfo, pollQuestions: poll.questions } });
        navigate(`/poll`);
        // navigate(`/poll/${pollObject.id}`);
    }

    function checkPoll() {
        if (state.pollInfo.id !== pollObject.id && state.answeredQuestions.length > 0) {
            if (window.confirm("You have an unanswered poll. Do you want to start a new one anyway?")) {
                dispatch({ type: RESET, payload: {} });
                startPoll();
            }
        }
        else {
            startPoll();
        }
    }


    return (
        <div className={`poll-object ${isAnswered && "poll-completed"}`}>
            <div onClick={() => {
                checkPoll();
            }}>
                <div className='title'>
                    <h4>{pollInfo.title}</h4>
                    <p
                        className={
                            ((new Date(pollInfo.pollEndsAt).getTime() >= new Date().getTime()) && new Date(pollInfo.pollEndsAt).getTime() - new Date().getTime() <= (7 * 24 * 3600000)) && "expire-soon"
                        }>
                        Poll ends at: {pollInfo.pollEndsAt}
                    </p>
                </div>
                <h5>{pollInfo.author.username}</h5>
                <p>{pollInfo.description}</p>
            </div>
            <div>
                {
                    (!isAnswered && (new Date(pollInfo.pollEndsAt).getTime() >= new Date().getTime())) &&
                    <button onClick={() => {
                        checkPoll();
                    }}>
                        {"Start"}
                    </button>
                }
                <button className='scnd-btn' onClick={(e) => navigate(`/pollresults/${pollInfo.id}`)}>
                    {"Results"}
                </button>
            </div>
        </div>
    );
}

export default PollObject;