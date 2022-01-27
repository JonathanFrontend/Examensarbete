import React from 'react';

function ResultQuestion({ qna }) {
    return (
        <div>
            <h4>{qna.question}</h4>
            <ul>
                {qna.answers.map((a, i) => <li key={i}>
                    <h5>{a.answer} - {a.votes}</h5>
                </li>)}
            </ul>
        </div>
    );
}

export default ResultQuestion;