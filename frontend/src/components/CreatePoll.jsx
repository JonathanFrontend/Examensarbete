import React, { useContext, useState } from 'react';
import { useStore } from 'react-redux';
import { UserContext } from '../contexts/UserContext';


function CreatePoll(props) {
    const { user, setUser } = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [pollEndsAt, setPollEndsAt] = useState([]);
    console.log(user)

    function publishPoll() {
        fetch("http://localhost:1337/api/polls", {
            method: "POST",
            headers: {
                "Content-type": "application/json; UTF-8",
                "Authorization": "Token " + user.jwt
            },
            body: JSON.stringify({
                data: {
                    title: "",
                    description: "",
                    questions: questions,
                    pollEndsAt: "",
                    author: user.user.id,
                }
            })
        }).then(r => r.json()).then(d => console.log(d)).catch(err => console.log(err));
    }

    function handleQuestion(event) {
        if (event.target.value === "radio" || event.target.value === "checkbox") {

            // document.querySelector("#option-question").innerHTML = 
        }
    }

    return (
        <main className='main start-main'>
            <section className='section start-section'>
                <div className='section-div'>
                    <div>
                        <h1>
                            Create a poll
                        </h1>
                    </div>
                    <div id="create-poll">
                        <div id='created-questions'>
                            {
                                questions && questions.map((q, i) => <div key={i}>
                                    <h4>{q.question}</h4>
                                    <h5>{q.type}</h5>
                                    {
                                        q.option && q.options.map((o, i) => <span key={i}>
                                            {o}
                                        </span>)
                                    }
                                </div>)
                            }
                        </div>
                        <div id='make-question'>
                            <div>
                                <label htmlFor='question'>
                                    Question:
                                </label>
                                <input type={"text"} id='question' />
                            </div>
                            <div>
                                <label htmlFor='radio'>Radio</label>
                                <input
                                    type={"radio"}
                                    id="radio"
                                    value="radio"
                                    name='question-type'
                                    onChange={e => handleQuestion(e)} />

                                <label htmlFor='checkbox'>Checkbox</label>
                                <input
                                    type={"radio"}
                                    id="checkbox"
                                    value="checkbox"
                                    name='question-type'
                                    onChange={e => handleQuestion(e)} />

                                <label htmlFor='text'>Text</label>
                                <input
                                    type={"radio"}
                                    id="text"
                                    value="text"
                                    name='question-type' />

                                <label htmlFor='rating'>Rating</label>
                                <input
                                    type={"radio"}
                                    id="rating"
                                    value="rating"
                                    name='question-type' />
                            </div>
                            <div id="option-question">

                            </div>
                        </div>
                        <button>
                            Add another question
                        </button>
                    </div>
                    <button>
                        Publish
                    </button>
                </div>
            </section>
        </main>
    );
}

export default CreatePoll;