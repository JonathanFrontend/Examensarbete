import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


function CreatePoll(props) {
    const { user, setUser } = useContext(UserContext);
    const userObj = user || JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    //Poll info
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([]);
    const [pollEndsAt, setPollEndsAt] = useState("");

    //Current question attributes
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentQuestionType, setCurrentQuestionType] = useState("");
    const [currentOptions, setCurrentOptions] = useState([]);

    function publishPoll() {
        console.log("user", user);
        console.log("user", JSON.stringify({
            data: {
                title: title,
                description: description,
                questions: questions,
                pollEndsAt: pollEndsAt,
                author: user.user.id,
                answered_polls: [],
                tags: []
            }
        }));

        /*

         data: {
                    title: title,
                    description: description,
                    questions: questions,
                    pollEndsAt: pollEndsAt,
                    author: user.user.id,
                    answered_polls: [],
                    tags: []
                }
                
         */
        console.log("user", user)
        fetch("http://localhost:1337/api/polls", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + user.jwt
            },
            body: JSON.stringify({
                data: {
                    title: title,
                    description: description,
                    author: user.user.id,
                    questions: questions,
                    pollEndsAt: pollEndsAt,
                    answered_polls: [],
                    tags: [1, 2]
                }
            })
        }).then(r => r.json()).then(d => {
            console.log("d", d);
            // navigate("/");
        }).catch(err => console.log(err));
    }

    function handleQuestion(event) {
        setCurrentQuestionType(event.target.value);
        if (event.target.value === "radio" || event.target.value === "checkbox") {
            if (currentOptions.length === 0) {
                setCurrentOptions(["", ""]);
            }
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
                        <div className="create-top">
                            <div>
                                <label htmlFor='new-poll-title'>
                                    Title:
                                </label>
                                <input type={"text"} id='new-poll-title' onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor='new-poll-desc'>
                                    Description:
                                </label>
                                <input type={"text"} id='new-poll-desc' onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="end-date">Expire date: </label>
                                <input type={"date"} onChange={(e) => setPollEndsAt(e.target.value)} />
                            </div>
                        </div>
                        <div id='created-questions'>
                            {
                                questions && questions.map((q, i) => <div key={i}>
                                    <h4>{q.question}</h4>
                                    <h5>{q.type}</h5>
                                    {
                                        q.options && q.options.map((o, j) => <span key={j}>
                                            {`${o} `}
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
                                <input type={"text"} value={currentQuestion} id='question' onChange={(e) => setCurrentQuestion(e.target.value)} />
                            </div>
                            <div>
                                <input
                                    type={"radio"}
                                    defaultChecked={false}
                                    id="radio"
                                    value="radio"
                                    name='question-type'
                                    onChange={(e) => {
                                        handleQuestion(e)
                                    }} />
                                <label htmlFor='radio'>Radio</label>

                                <input
                                    type={"radio"}
                                    defaultChecked={false}
                                    id="checkbox"
                                    value="checkbox"
                                    name='question-type'
                                    onChange={(e) => {
                                        handleQuestion(e)
                                    }} />
                                <label htmlFor='checkbox'>Checkbox</label>

                                <input
                                    type={"radio"}
                                    defaultChecked={false}
                                    id="text"
                                    value="text"
                                    name='question-type'
                                    onChange={(e) => {
                                        handleQuestion(e)
                                    }} />
                                <label htmlFor='text'>Text</label>

                                <input
                                    type={"radio"}
                                    defaultChecked={false}
                                    id="rating"
                                    value="rating"
                                    name='question-type'
                                    onChange={(e) => {
                                        handleQuestion(e)
                                    }} />
                                <label htmlFor='rating'>Rating</label>
                            </div>
                            {
                                (currentQuestionType === "radio" || currentQuestionType === "checkbox") &&
                                <div id="option-question">
                                    {
                                        currentOptions && currentOptions.map((o, i) => {
                                            return <span key={i}>
                                                <input
                                                    type={"text"}
                                                    placeholder={`Option ${i + 1}`}
                                                    value={o}
                                                    onChange={(e) => {
                                                        const arr = [...currentOptions];
                                                        arr[i] = e.target.value;
                                                        setCurrentOptions(arr);
                                                        /* if (e.target.value.replace(/\s/g, '')) {
                                                            const arr = [...currentOptions];
                                                            arr[i] = e.target.value;
                                                            setCurrentOptions(arr);
                                                        } */
                                                    }} />
                                                <span
                                                    className='X'
                                                    onClick={(e) => {
                                                        const arr = [...currentOptions];
                                                        arr.splice(i, 1);
                                                        if (!(arr.length < 2)) {
                                                            setCurrentOptions(arr);
                                                        }
                                                    }}>
                                                    X
                                                </span>
                                            </span>
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
                        <button onClick={() => {
                            let cond1 = (
                                currentQuestion.replace(/\s/g, '').length !== 0 &&
                                currentQuestionType.replace(/\s/g, '').length !== 0
                            );

                            let cond2 = (currentQuestionType === "radio" || currentQuestionType === "checkbox")
                                ? !currentOptions.some(e => e.replace(/\s/g, '').length === 0)
                                : true;

                            if (cond1 && cond2) {
                                const questionObj = {
                                    question: currentQuestion,
                                    type: currentQuestionType,
                                    options: (currentQuestionType === "radio" || currentQuestionType === "checkbox") ? currentOptions : []
                                }
                                let arr = [...questions];
                                arr.push(questionObj);
                                setQuestions(arr);
                                setCurrentQuestion("");
                                //setCurrentQuestionType("radio");
                                setCurrentOptions(["", ""])
                            }
                        }}>
                            Add question
                        </button>
                    </div>
                    <button onClick={() => publishPoll()}>
                        Publish
                    </button>
                </div>
            </section>
        </main>
    );
}

export default CreatePoll;