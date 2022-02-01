import React, { useContext, useState } from 'react';
import { useStore } from 'react-redux';
import { UserContext } from '../contexts/UserContext';


function CreatePoll(props) {
    const { user, setUser } = useContext(UserContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([]);
    const [pollEndsAt, setPollEndsAt] = useState([]);

    //Current question attributes
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentQuestionType, setCurrentQuestionType] = useState("");
    const [currentOptions, setCurrentOptions] = useState([]);

    console.log(user)

    function publishPoll() {
        fetch("http://localhost:1337/api/polls", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
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

            setCurrentOptions(["", ""]);
        } else {
            setCurrentOptions([]);
        }
    }

    return (
        <main className='main start-main'>
            {console.log("currentOptions", currentOptions)}
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
                                        q.option && q.options.map((o, j) => <span key={j}>
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
                                    onChange={(e) => handleQuestion(e)} />

                                <label htmlFor='checkbox'>Checkbox</label>
                                <input
                                    type={"radio"}
                                    id="checkbox"
                                    value="checkbox"
                                    name='question-type'
                                    onChange={(e) => handleQuestion(e)} />

                                <label htmlFor='text'>Text</label>
                                <input
                                    type={"radio"}
                                    id="text"
                                    value="text"
                                    name='question-type'
                                    onChange={(e) => handleQuestion(e)} />

                                <label htmlFor='rating'>Rating</label>
                                <input
                                    type={"radio"}
                                    id="rating"
                                    value="rating"
                                    name='question-type'
                                    onChange={(e) => handleQuestion(e)} />
                            </div>
                            {
                                currentOptions &&
                                <div id="option-question">
                                    {
                                        currentOptions.map((o, i) => {
                                            return <input
                                                key={i}
                                                type={"text"}
                                                placeholder={`Option ${i + 1}`}
                                                onChange={(e) => {
                                                    const arr = [...currentOptions];
                                                    arr[i] = e.target.value;
                                                    console.log("arr", arr);
                                                    setCurrentOptions(arr);
                                                }} />
                                        })
                                    }
                                    <button onClick={() => {
                                        const arr = [...currentOptions];
                                        arr.push("");
                                        setCurrentOptions(arr);
                                    }}>
                                        Add option
                                    </button>
                                </div>
                            }
                        </div>
                        <button>
                            Add question
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