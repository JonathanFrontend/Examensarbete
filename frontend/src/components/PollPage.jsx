import React from 'react';
import { useParams } from "react-router-dom";
import polls from "../json/polls.json"
import { useSelector, useDispatch } from 'react-redux';
import Question from './Question';

function PollPage(props) {
    // const param = useParams();
    // const poll = polls.find(p => p.id === param.id)
    // console.log("params poll", param, poll)
    const poll = useSelector(state => state.poll.poll);
    const dispatch = useDispatch();
    console.log("/poll ", poll);
    return (
        <main className='main start-main'>
            <section className='section start-section'>
                <div className='section-div'>
                    <div>
                        <h1>
                            {
                                poll.title
                            }
                        </h1>
                    </div>
                    <div>
                        {
                            poll.questions.map((q, i) => <Question key={i} index={i} question={q} />)
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}

export default PollPage;