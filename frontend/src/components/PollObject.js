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

    useEffect(() => {
        if (user) {
            const findUsersID = poll.answered_polls.data.find(p => {
                if (p.attributes) {
                    return p.attributes.UserID === `${user.user.id}`
                }
            });

            if (findUsersID && findUsersID.attributes.UserID === `${user.user.id}`) {
                setIsAnswered(true);
            }
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
    const day = (1000 * 60 * 60 * 24);

    return (
        <div className={`poll-object ${isAnswered && "poll-completed"}`}>
            <div onClick={() => {
                checkPoll();
            }}>
                <div className='title'>
                    <h4>{pollInfo.title}</h4>
                    <p
                        className={
                            (new Date(pollInfo.pollEndsAt).getTime() - new Date().getTime() <= (7 * 24 * 3600000)) ? "expire-soon" : ""
                        }>
                        Poll
                        {(Math.floor(new Date(pollInfo.pollEndsAt).getTime() / day) < Math.floor(new Date().getTime() / day))
                            ? " ended "
                            : " ends "}
                        at: {pollInfo.pollEndsAt}
                    </p>
                </div>
                <h5>{pollInfo.author.username}</h5>
                <div>
                    <ul className='tag-list'>
                        {
                            (pollInfo.tags && Array.isArray(pollInfo.tags))
                            && pollInfo.tags.map((tag, i) => <li key={i}>
                                {`${tag.attributes.name}`}
                            </li>)
                        }
                    </ul>
                </div>
                <p>{pollInfo.description}</p>
            </div>
            <div>
                {
                    (user && !isAnswered && (new Date(pollInfo.pollEndsAt).getTime() >= new Date().getTime())) &&
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