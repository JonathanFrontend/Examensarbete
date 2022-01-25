import React from 'react';
import { useParams } from 'react-router-dom';

function PollResults(props) {
    const params = useParams();
    console.log("params", params)
    return (
        <div>

        </div>
    );
}

export default PollResults;