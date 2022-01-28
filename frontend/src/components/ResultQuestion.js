import React, { useEffect, useState } from 'react';

function ResultQuestion({ qna, poll }) {
    console.log("poll", poll)
    const [totalVotes, setTotalVotes] = useState(0);
    useEffect(() => {
        let newTotalVotes = 0;
        /* for (let i = 0; i < qna.answers.length; i++) {
            newTotalVotes += qna.answers[i].votes;
        } */
        for (let a of qna.answers) {
            newTotalVotes += a.votes;
        }
        setTotalVotes(newTotalVotes);
    }, []);
    return (
        <div>
            {console.log("votes", totalVotes)}
            <h4>{qna.question}</h4>
            <ul>
                {qna.answers.map((a, i) => {
                    return <li key={i}>
                        <h5>{a.answer} - {a.votes} / {totalVotes}</h5>
                    </li>
                })}
            </ul>
            <br />
        </div>
    );
}

export default ResultQuestion;