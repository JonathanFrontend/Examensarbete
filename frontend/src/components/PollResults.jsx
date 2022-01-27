import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PollResults(props) {
    const [currentPoll, setCurrentPoll] = useState(null);
    const [answers, setAnwers] = useState([]);
    const [sortedAnswers, setSortedAnswers] = useState([]);
    const params = useParams();
    console.log("params", params);

    const voteCounter = (poll) => {
        if (poll) {
            const answersCopy = [];
            const answeredPolls = poll.answered_polls.data;
            // console.log("poll", poll)
            for (let i = 0; i < poll.questions.length; i++) {
                answersCopy.push([]);
            }

            console.log("answers Before loop", answersCopy);

            for (let i = 0; i < answeredPolls.length; i++) {
                const pollAnswers = answeredPolls[i].attributes.pollAnswers;
                for (let j = 0; j < pollAnswers.length; j++) {
                    // console.log("pollAnswers[j].answer", pollAnswers[j].answer);
                    answersCopy[pollAnswers[j].indexOfQuestion].push(pollAnswers[j].answer);
                }
            }
            console.log(poll);
            console.log("answers After loop", answersCopy);
            // setAnwers(answersCopy);
            return answersCopy;
        }
    }

    useEffect(() => {
        fetch(`http://localhost:1337/api/polls/${params.id}?populate=*`).then(
            r => r.json()
        ).then(
            d => {
                console.log("d", d)
                setCurrentPoll(d.data.attributes);
                setAnwers(voteCounter(d.data.attributes));
            }
        ).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (answers && currentPoll) {
            const answersCopy = [...answers];
            const sortedAnswersCopy = [];
            for (let i = 0; i < answersCopy.length; i++) {
                sortedAnswersCopy.push([]);
            };
            const questions = currentPoll.questions;

            function getOccurrence(array, value) {
                let count = 0;
                array.forEach((v) => (v === value && count++));
                return {
                    answer: value,
                    votes: count
                };
            };
            console.log("answersCopy", answersCopy)

            for (let i = 0; i < questions.length; i++) {
                const q = questions[i];
                if (q.type == "radio") {
                    for (let j = 0; j < q.options.length; j++) {
                        sortedAnswersCopy[i].push(getOccurrence(answersCopy[i], q.options[j]));
                    }
                    console.log("sortedAnswersCopy", sortedAnswersCopy)

                } else if (q.type == "checkbox") {
                    for (let j = 0; j < q.options.length; j++) {

                        console.log("q.options", q.options[j]);
                        const arr = [...answersCopy[i]];
                        const flatArr = arr.flat(Infinity);
                        console.log("answersCopy[i]", answersCopy[i]);
                        console.log("flatArr", flatArr);
                        sortedAnswersCopy[i].push(getOccurrence(flatArr, q.options[j]));

                        /* const concattedArr = [];

                        for (let k = 0; k < answersCopy[i].length; k++) {
                            concattedArr.concat(answersCopy[i][k])
                        }

                        console.log("concattedArr", concattedArr);

                        console.log("sortedAnswersCopy[i] before push", sortedAnswersCopy[i]);

                        sortedAnswersCopy[i].push(getOccurrence(concattedArr, q.options[j]));

                        console.log("sortedAnswersCopy[i] after push", sortedAnswersCopy[i]); */

                    }
                    console.log("sortedAnswersCopy", sortedAnswersCopy)

                }
            };
            setSortedAnswers(sortedAnswersCopy);
        }
    }, [answers])

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
                            console.log("sortedAnswers", sortedAnswers)
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