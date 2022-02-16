import React, { useEffect, useState } from 'react';

function ResultQuestion({ qna, poll }) {
    const [totalVotes, setTotalVotes] = useState(0);
    useEffect(() => {
        let newTotalVotes = 0;
        for (let a of qna.answers) {
            newTotalVotes += a.votes;
        }
        setTotalVotes(newTotalVotes);
    }, []);

    switch (qna.type) {
        case "radio":
            return (
                <div>
                    <h4>{qna.question}</h4>
                    <ul>
                        {qna.answers.map((a, i) => {
                            let percent = (a.votes / totalVotes) * 100;
                            return <li key={i}>
                                <h5>{a.answer} - {totalVotes ? `${a.votes} / ${totalVotes}` : "No votes yet"}</h5>
                                <div className='metercontainer'>
                                    <div className='barmeter'>
                                        <div
                                            className='meter'
                                            style={{ width: `${Math.round(percent) ? Math.round(percent) : 0}%` }} />
                                    </div>
                                    <span className='percent'>
                                        {
                                            `${Math.round(percent) ? Math.round(percent) : 0}%`
                                        }
                                    </span>
                                </div>
                            </li>
                        }
                        )}
                    </ul>
                    <br />
                </div>
            );
        case "checkbox":
            return (
                <div>
                    <h4>{qna.question}</h4>
                    <ul>
                        {qna.answers.map((a, i) => {
                            let percent = (a.votes / totalVotes) * 100;
                            return <li key={i}>
                                <h5>{a.answer} - {totalVotes ? `${a.votes} / ${totalVotes}` : "No votes yet"}</h5>
                                <div className='metercontainer'>
                                    <div className='barmeter'>
                                        <div
                                            className='meter'
                                            style={{ width: `${Math.round(percent) ? Math.round(percent) : 0}%` }} />
                                    </div>
                                    <span className='percent'>
                                        {
                                            `${Math.round(percent) ? Math.round(percent) : 0}%`
                                        }
                                    </span>
                                </div>
                            </li>
                        }
                        )}
                    </ul>
                    <br />
                </div>
            );
        case "rating":
            const starPercentage = ((qna.answers[0].answer / 5) * 100) + '%';
            return (
                <div>
                    <h4>{qna.question}</h4>
                    <span className="rating-box">
                        <span><h5>{qna.answers[0].answer}</h5></span>
                        <div className="star-outer">
                            <div className="star-inner" style={{ width: starPercentage }}></div>
                        </div>
                    </span>
                    <br />
                </div>
            );
        case "text":
            return (
                <div>
                    <h4>{qna.question}</h4>
                    <ul className='comment-list'>
                        {qna.answers[0].answer.map((a, i) => {
                            return <li key={i} className='comment'>
                                <span>
                                    {a}
                                </span>
                            </li>
                        }
                        )}
                    </ul>
                    <br />
                </div>
            );
    }
}

export default ResultQuestion;