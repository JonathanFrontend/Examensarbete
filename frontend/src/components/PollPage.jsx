import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import polls from "../json/polls.json"
import { useSelector, useDispatch } from 'react-redux';
import Question from './Question';
import { RESET } from '../texts';
import { UserContext } from '../contexts/UserContext';

function PollPage(props) {
    const navigate = useNavigate();
    const params = useParams();
    const { user, setUser } = useContext(UserContext);
    const state = useSelector(state => state);
    const pollInfo = useSelector(state => state.pollInfo);
    const pollQuestions = useSelector(state => state.pollQuestions);
    const answeredQuestions = useSelector(state => state.answeredQuestions);
    const dispatch = useDispatch();
    const [unanswered, setUnanswered] = useState([]);
    console.log("state", state);
    console.log("answeredQuestions", answeredQuestions);

    useEffect(() => {
        async function fetchData() {
            const fetchAPs = await fetch(`http://localhost:1337/api/polls/${pollInfo.id}?populate=*`);
            const pollData = await fetchAPs.json();
            const answeredPolls = pollData.data.attributes.answered_polls.data;
            const findUsersID = answeredPolls.find(p => p.attributes.UserID === `${user.user.id}`);
            if (findUsersID && findUsersID.attributes.UserID === `${user.user.id}`) {
                navigate('/start');
            }
            /* if (res.data.attributes) {
                const findIfUserHasAnswered = res.data.attributes.answerers.find(a => a === user.user.id);
                console.log("findIfUserHasAnswered", findIfUserHasAnswered)
                if (findIfUserHasAnswered) {

                }
            } */


        }
        fetchData();
    }, [])

    function submitPoll() {
        /* fetch(`http://localhost:1337/api/users/${pollInfo.id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + user.jwt
            },
            body: JSON.stringify({
                data: {
                    listOfAnsweredPolls: [...pollInfo.answerers].push(user.user.id)
                }
            }),
        }).then(r => r.json()).then(d => {
            if (d.data) {
                dispatch({ type: RESET });
                navigate("/");
            }
        }).catch(err => console.error(err)); */

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
                    author: user.user.id,
                    UserID: `${user.user.id}`
                }
            }),
        }).then(r => r.json()).then(d => {
            if (d.data) {
                dispatch({ type: RESET });
                navigate("/");
            }
        }).catch(err => console.error(err));

    }

    function handleSubmit(aq) {
        let u = aq.filter(q => !q.answer || q.answer.length === 0);
        if (u.length !== 0) { //Om en fråga är obesvarad.
            setUnanswered(u);
        } else {
            submitPoll();
        }
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
                                pollQuestions.map((q, i) => <Question key={i} index={i} question={q} unanswered={unanswered} />)
                            }
                        </div>
                        <button onClick={() => handleSubmit(answeredQuestions)}>
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