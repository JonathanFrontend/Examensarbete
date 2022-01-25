import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PollResults(props) {
    const [currentPoll, setCurrentPoll] = useState(null);
    const params = useParams();
    console.log("params", params);

    useEffect(() => {
        fetch(`http://localhost:1337/api/polls/${params.id}?populate=*`).then(
            r => r.json()
        ).then(
            d => {
                console.log("d", d)
                setCurrentPoll(d.data.attributes)
            }
        ).catch(err => console.error(err));
    }, []);

    return (
        <main className='main start-main'>
            <section className='section start-section'>
                <div className='section-div'>
                    <div>
                        <h1>
                            {
                                currentPoll ? `Results of "${currentPoll.title}"` : "Loading..."
                            }
                        </h1>
                    </div>
                    <div>
                        {
                            currentPoll.answered_polls
                        }
                    </div>
                    <button>
                        close
                    </button>
                </div>
            </section>
        </main>
    );
}

export default PollResults;