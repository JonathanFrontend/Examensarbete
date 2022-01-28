import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResultQuestion from './ResultQuestion';

function PollResults(props) {
    const [currentPoll, setCurrentPoll] = useState(null);
    // const [answers, setAnwers] = useState([]);
    const [thePollResults, setThePollResults] = useState([]);
    const params = useParams();
    // console.log("params", params);

    const sortingAnswers = (poll) => {
        if (poll) {
            const answersCopy = [];
            const answeredPolls = poll.answered_polls.data;
            // console.log("poll", poll)
            for (let q of poll.questions) {
                answersCopy.push([]);
            }

            // console.log("answers Before loop", answersCopy);

            for (let a of answeredPolls) {
                const pollAnswers = a.attributes.pollAnswers;
                for (let j of pollAnswers) {
                    // console.log("pollAnswers[j].answer", pollAnswers[j].answer);
                    answersCopy[j.indexOfQuestion].push(j.answer);
                }
            }
            // console.log(poll);
            // console.log("answers After loop", answersCopy);
            // setAnwers(answersCopy);
            return answersCopy;
        }
    }

    function voteCounter(answers, currentPoll) {
        if (answers && currentPoll) {
            const answersCopy = [...answers];
            const sortedAnswersCopy = [];
            const questions = currentPoll.questions;
            // console.log("questions", questions)
            for (let q of questions) {
                sortedAnswersCopy.push({ question: q.question, answers: [] });
            };

            function getVotes(array, value) {
                let votes = 0;
                array.forEach((v) => (v === value && votes++));
                return {
                    answer: value,
                    votes: votes
                };
            };

            for (let i = 0; i < questions.length; i++) {
                const q = questions[i];
                if (q.type == "radio") {
                    for (let o of q.options) {
                        sortedAnswersCopy[i].answers.push(getVotes(answersCopy[i], o));
                    }

                } else if (q.type == "checkbox") {
                    for (let o of q.options) {
                        const arr = [...answersCopy[i]];
                        const flatArr = arr.flat(Infinity);
                        sortedAnswersCopy[i].answers.push(getVotes(flatArr, o));

                        /* const concattedArr = [];

                        for (let k = 0; k < answersCopy[i].length; k++) {
                            concattedArr.concat(answersCopy[i][k])
                        }

                        console.log("concattedArr", concattedArr);

                        console.log("sortedAnswersCopy[i] before push", sortedAnswersCopy[i]);

                        sortedAnswersCopy[i].push(getOccurrence(concattedArr, q.options[j]));

                        console.log("sortedAnswersCopy[i] after push", sortedAnswersCopy[i]); */

                    }
                    // console.log("sortedAnswersCopy", sortedAnswersCopy)

                }
            };
            return sortedAnswersCopy;
        }
    }

    useEffect(() => {
        fetch(`http://localhost:1337/api/polls/${params.id}?populate=*`).then(
            r => r.json()
        ).then(
            d => {
                // console.log("d", d)
                setCurrentPoll(d.data.attributes);
                //setAnwers(sortingAnswers(d.data.attributes));
                setThePollResults(voteCounter(sortingAnswers(d.data.attributes), d.data.attributes));
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
                            thePollResults ? thePollResults.map((q, i) => <ResultQuestion key={i} qna={q} poll={currentPoll} />) : "loading... please wait"
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