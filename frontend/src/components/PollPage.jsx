import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import polls from "../json/polls.json"
import { useSelector, useDispatch } from 'react-redux';
import Question from './Question';
import { RESET } from '../texts';
import { UserContext } from '../contexts/UserContext';

function PollPage(props) {
    const navigate = useNavigate();
    // const param = useParams();
    // const poll = polls.find(p => p.id === param.id)
    // console.log("params poll", param, poll)
    const { user, setUser } = useContext(UserContext);
    const state = useSelector(state => state);
    const pollInfo = useSelector(state => state.pollInfo);
    const pollQuestions = useSelector(state => state.pollQuestions);
    const answeredQuestions = useSelector(state => state.answeredQuestions);
    const dispatch = useDispatch();
    console.log("state", state);
    console.log("answeredQuestions", answeredQuestions);

    function submitPoll() {
        console.log("user", user)
        fetch("http://localhost:1337/api/answered-polls", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + user.jwt
            },
            body: JSON.stringify({
                data: {
                    pollAnswers: answeredQuestions,
                    poll: pollInfo.id,
                    author: user.user.id
                }
            }),
        }).then(r => r.json()).then(d => {
            console.log(d);
        }).catch(err => console.error(err));

        dispatch({ type: RESET });
        navigate("/");
    }
    if (user) {
        return (
            <main className='main start-main'>
                <section className='section start-section'>
                    <div className='section-div'>
                        <div>
                            <h1>
                                {
                                    pollInfo.title
                                }
                            </h1>
                        </div>
                        <div>
                            {
                                pollQuestions.map((q, i) => <Question key={i} index={i} question={q} />)
                            }
                        </div>
                        <button onClick={submitPoll}>
                            Submit
                        </button>
                    </div>
                </section>
            </main>
        );
    }
    else {
        return (
            <main className='main start-main'>
                <section className='section start-section'>
                    <div className='section-div'>
                        <div>
                            <h1>
                                {
                                    pollInfo.title
                                }
                            </h1>
                        </div>
                        <div>
                            <h2>
                                You need to be logged in to answer polls.
                            </h2>
                        </div>
                        <button onClick={() => navigate('/login')}>
                            Login
                        </button>
                    </div>
                </section>
            </main>
        );
    }
}

export default PollPage;