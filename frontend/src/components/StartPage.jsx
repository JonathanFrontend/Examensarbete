import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserContext } from '../contexts/UserContext';
import useFetch from '../hooks/useFetch';
// import polls from "./../json/polls.json"
import PollObject from './PollObject';

function StartPage() {
    const { loading, error, data } = useFetch("http://localhost:1337/api/polls?populate=*");
    const pollInfo = useSelector(state => state.pollInfo);
    const pollQuestions = useSelector(state => state.pollQuestions);
    const [polls, setPolls] = useState([]);

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {

        fetch("http://localhost:1337/api/polls?populate=*").then(r => r.json()).then(d => {
            // console.log("data: ", d.data);
            setPolls(d.data);
        }).catch(err => console.error(err));


        if (localStorage.getItem("user")) {
            console.log('JSON.parse(localStorage.getItem("user"))', JSON.parse(localStorage.getItem("user")))
            if (JSON.parse(localStorage.getItem("user"))) {
                setUser(JSON.parse(localStorage.getItem("user")));
            } else if (!JSON.parse(localStorage.getItem("user"))) {
                setUser(null);
            }
        }

    }, []);

    // console.log("state", chosenPoll, answeredQuestions);

    /* const [ polls, setPolls ] = useState([]);
    useEffect(() => {

    }, []) */
    return (
        <main className='main start-main'>
            <section className='section start-section'>
                <div className='section-div'>
                    <div>
                        <h1>
                            New polls today
                        </h1>
                    </div>
                    <div>
                        {
                            polls ? polls.map((poll, i) => {
                                return poll ? <PollObject key={i} pollObject={poll} /> : ""
                            }) : "Loading..."
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}

export default StartPage;