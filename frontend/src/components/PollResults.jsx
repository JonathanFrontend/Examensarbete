import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResultQuestion from './ResultQuestion';

function PollResults(props) {
    const navigate = useNavigate();
    const [currentPoll, setCurrentPoll] = useState(null);
    const [thePollResults, setThePollResults] = useState([]);
    const params = useParams();

    const sortingAnswers = (poll) => {
        if (poll) {
            const answersCopy = [];
            const answeredPolls = poll.answered_polls.data;
            for (let q of poll.questions) {
                answersCopy.push([]);
            }

            for (let a of answeredPolls) {
                const pollAnswers = a.attributes.pollAnswers;
                for (let j of pollAnswers) {
                    answersCopy[j.indexOfQuestion].push(j.answer);
                }
            }

            return answersCopy;
        }
    }

    function voteCounter(answers, currentPoll) {
        if (answers && currentPoll) {
            const answersCopy = [...answers];
            const sortedAnswersCopy = [];
            const questions = currentPoll.questions;

            for (let q of questions) {
                sortedAnswersCopy.push({ question: q.question, answers: [], type: q.type });
            };

            function getVotes(array, value, type) {
                let votes = 0;
                array.forEach((v) => (v === value && votes++));
                return {
                    answer: value,
                    votes: votes,
                    type: type
                };
            };

            function calculateRating(array, type) {
                let score = 0;
                let voteAmount = 0;

                array.forEach((v) => {
                    voteAmount++;
                    score += parseInt(v);
                });

                let averageRating = (voteAmount > 0) ? score / voteAmount : 0;

                return {
                    answer: Math.round(averageRating * 10) / 10,
                    votes: voteAmount,
                    type: type
                };
            };

            function getComments(array, type) {
                return {
                    answer: array,
                    type: type
                };
            };

            for (let i = 0; i < questions.length; i++) {
                const q = questions[i];
                if (q.type == "radio") {
                    for (let o of q.options) {
                        sortedAnswersCopy[i].answers.push(getVotes(answersCopy[i], o, q.type));
                    }

                } else if (q.type == "checkbox") {
                    for (let o of q.options) {
                        const arr = [...answersCopy[i]];
                        const flatArr = arr.flat(Infinity);
                        sortedAnswersCopy[i].answers.push(getVotes(flatArr, o, q.type));
                    }
                } else if (q.type == "rating") {
                    sortedAnswersCopy[i].answers.push(calculateRating(answersCopy[i], q.type));
                } else if (q.type == "text") {
                    sortedAnswersCopy[i].answers.push(getComments(answersCopy[i], q.type))
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
                setCurrentPoll(d.data.attributes);
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
                    <div className='result-box box-2'>
                        {
                            thePollResults ? thePollResults.map((q, i) => <ResultQuestion key={i} qna={q} qIndex={i} poll={currentPoll} />) : "loading... please wait"
                        }
                    </div>
                    <button onClick={() => navigate('/start')}>
                        Close
                    </button>
                </div>
            </section>
        </main>
    );
}

export default PollResults;