import React, { useEffect, useState } from 'react';

function ResultQuestion({ qna, poll }) {
    console.log("QnA", qna)
    const [totalVotes, setTotalVotes] = useState(0);
    useEffect(() => {
        let newTotalVotes = 0;
        /* for (let i = 0; i < qna.answers.length; i++) {
            newTotalVotes += qna.answers[i].votes;
        } */
        for (let a of qna.answers) {
            console.log("qna.answer", a);
            newTotalVotes += a.votes;
        }
        setTotalVotes(newTotalVotes);
    }, []);
    return (
        <div>
            <h4>{qna.question}</h4>
            <ul>
                {qna.answers.map((a, i) => {
                    let percent = (a.votes / totalVotes) * 100;
                    if (a.type === "rating") {

                        const starPercentage = ((a.answer / 5) * 100) + '%';

                        return <li key={i}>
                            <span className="rating-box">
                                <span><h5>{a.answer}</h5></span>
                                <div className="star-outer">
                                    <div className="star-inner" style={{ width: starPercentage }}></div>
                                </div>
                            </span>
                        </li>
                    } else {
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
                })}
            </ul>
            <br />
        </div>
    );
}

export default ResultQuestion;