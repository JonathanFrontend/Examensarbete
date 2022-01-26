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

    const voteCounter = (poll) => {
        if (poll) {
            const answers = [];
            const answeredPolls = poll.answered_polls.data;
            // console.log("poll", poll)
            for (let i = 0; i < poll.questions.length; i++) {
                answers.push([]);
            }

            console.log("answers Before loop", answers);

            for (let i = 0; i < answeredPolls.length; i++) {
                const pollAnswers = answeredPolls[i].attributes.pollAnswers;
                for (let j = 0; j < pollAnswers.length; j++) {
                    // console.log("pollAnswers[j].answer", pollAnswers[j].answer);
                    answers[pollAnswers[j].indexOfQuestion].push(pollAnswers[j].answer);
                }
            }
            console.log(poll);
            console.log("answers After loop", answers);
        }
    }

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
                            voteCounter(currentPoll)
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