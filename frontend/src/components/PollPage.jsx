import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import polls from "../json/polls.json"
import { useSelector, useDispatch } from 'react-redux';
import Question from './Question';
import { RESET } from '../texts';

function PollPage(props) {
    const navigate = useNavigate();
    // const param = useParams();
    // const poll = polls.find(p => p.id === param.id)
    // console.log("params poll", param, poll)
    const state = useSelector(state => state);
    const pollInfo = useSelector(state => state.pollInfo);
    const pollQuestions = useSelector(state => state.pollQuestions);
    const answeredQuestions = useSelector(state => state.answeredQuestions);
    const dispatch = useDispatch();
    console.log("state", state);
    console.log("answeredQuestions", answeredQuestions);
    function submitPoll() {
        /* fetch("http://localhost:1337/api/answered-polls", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                { title: "Vue POST Request Example" }
            )
        }).then(r => r.json).then(d => console.log(d)).catch(err => console.log(err)) */
        dispatch({ type: RESET });
        navigate("/");
    }
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

export default PollPage;