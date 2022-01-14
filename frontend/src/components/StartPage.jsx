import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import polls from "./../json/polls.json"
import PollObject from './PollObject';

function StartPage() {
    const { user, setUser } = useContext(UserContext);
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
                            polls.map((poll, i) => <PollObject key={i} poll={poll} />)
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}

export default StartPage;