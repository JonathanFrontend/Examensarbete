import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import useFetch from '../hooks/useFetch';
import axios from "axios";


function CreatePoll(props) {
    const { user, setUser } = useContext(UserContext);
    const userObj = user || JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    //Poll info
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pollTags, setPollTags] = useState([]);
    const [pollTagIds, setPollTagIds] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [pollEndsAt, setPollEndsAt] = useState("");
    const [tagWord, setTagWord] = useState("");

    //Current question attributes
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentQuestionType, setCurrentQuestionType] = useState("");
    const [currentOptions, setCurrentOptions] = useState([]);
    const [addImage, setAddImage] = useState(false);
    const [imageArray, setImageArray] = useState([]);

    //fileupload
    const [fileToUpload, setFileToUpload] = useState(null);

    function onChangeFile(event) {
        setFileToUpload(event.target.files[0]);
    }

    async function handleSubmitFile(event, file) {
        event.preventDefault();
        const fileData = new FormData();
        fileData.append("files", file);

        if (fileData && file && file.type.includes("image")) {
            const upload_res = await axios({
                method: "POST",
                url: "http://localhost:1337/api/upload",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': `Bearer ${user.jwt}`
                },
                data: fileData,
            });

            if (upload_res.status === 200) {
                let imageArrayCopy = [...imageArray];
                imageArrayCopy.push(upload_res.data[0].url);
                setImageArray(imageArrayCopy);
            } else {
                console.error(upload_res)
            }
        }
    }

    const tags = useFetch("http://localhost:1337/api/tags");

    function publishPoll() {
        /**
                    title: title,
                    description: description,
                    author: user.user.id,
                    questions: questions,
                    pollEndsAt: pollEndsAt,
                    answered_polls: [],
                    tags: pollTagIds 
        */
        const inputData = [
            title,
            description,
            user.user.id,
            questions,
            pollEndsAt
        ];
        let isNotEmpty = true;

        for (let k of inputData) {
            if (Array.isArray(k)) {
                if (k.length === 0) {
                    isNotEmpty = false;
                }
            } else if (!k) {
                isNotEmpty = false;
            }
        }

        if (isNotEmpty) {
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
                        tags: pollTagIds
                    }
                })
            }).then(r => r.json()).then(d => {
                if (d.data) {
                    navigate("/");
                } else if (d.error && d.error.message) {
                    setErrorMsg(d.error.message);
                } else {
                    setErrorMsg("An unknown error occurred");
                }
            }).catch(err => console.log(err));
        } else {
            setErrorMsg("Please fill in ALL the text fields.");
        }
    }

    function handleQuestion(event) {
        setCurrentQuestionType(event.target.value);
        if (event.target.value === "radio" || event.target.value === "checkbox") {
            if (currentOptions.length === 0) {
                setCurrentOptions(["", ""]);
            }
        }
    }

    useEffect(() => {
        if (errorMsg) {
            const inputData = [
                title,
                description,
                pollEndsAt
            ];
            let isNotEmpty = true;

            for (let k of inputData) {
                if (!k) {
                    isNotEmpty = false;
                }
            }
            if (isNotEmpty) {
                setErrorMsg("");
            }
        }
    })

    if (user) {
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
                            {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
                            <div className="create-top">
                                <div className='box-1'>
                                    <div className='box-1-1'>
                                        <div>
                                            <label htmlFor='new-poll-title'>
                                                Title:
                                            </label>
                                            <input type={"text"} id='new-poll-title' onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="tag-list">Tags: </label>
                                                <input type={"text"} list='tag-list' onChange={(e) => {
                                                    let pollTagsArr = [...pollTags];
                                                    let tagArr = [...tags.data.data];

                                                    let findTag = [...tagArr].find(t => {
                                                        return t.attributes.name === e.target.value;
                                                    });

                                                    findTag && pollTagsArr.push(findTag);

                                                    let arrRemoveDuplicates = pollTagsArr.filter((t, index) => {
                                                        return pollTagsArr.indexOf(t) === index;
                                                    });

                                                    let tagArray = arrRemoveDuplicates.map(i => i.id);

                                                    setTagWord(e.target.value);
                                                    setPollTags(arrRemoveDuplicates);
                                                    setPollTagIds(tagArray);
                                                }} />
                                                <datalist id='tag-list'>
                                                    {
                                                        (!tags.loading && !tags.error)
                                                            ? tags.data.data.map((tag, i) => {
                                                                return (
                                                                    <option key={i} value={tag.attributes.name}>
                                                                        {tag.attributes.name}
                                                                    </option>
                                                                )
                                                            }
                                                            ) : ""
                                                    }
                                                </datalist>
                                                <div>
                                                    <ul className='added-tags'>
                                                        {
                                                            pollTags.map((tag, i) => <li key={i}>
                                                                <p>{tag.attributes.name}</p><span className='X' onClick={() => {
                                                                    let pollTagCopy = [...pollTags];
                                                                    let pollTagIdCopy = [...pollTagIds];
                                                                    pollTagCopy.splice(i, 1);
                                                                    pollTagIdCopy.splice(i, 1);
                                                                    setPollTagIds(pollTagIdCopy);
                                                                    setPollTags(pollTagCopy);
                                                                }}>x</span>
                                                            </li>)
                                                        }
                                                    </ul>
                                                </div>
                                                {
                                                    ((!tags.loading && !tags.error) &&
                                                        tags.data.data.find((tag, i) => {
                                                            if (tag.attributes.name.toLowerCase().includes(tagWord.toLowerCase())) {
                                                                return true
                                                            }
                                                        })) ? "" : <button
                                                            className='scnd-btn'
                                                            onClick={() => {
                                                                fetch("http://localhost:1337/api/tags", {
                                                                    method: "POST",
                                                                    mode: "cors",
                                                                    headers: {
                                                                        "Content-type": "application/json; charset=UTF-8",
                                                                        "Authorization": "Bearer " + user.jwt
                                                                    },
                                                                    body: JSON.stringify({
                                                                        data: {
                                                                            name: tagWord,
                                                                            polls: []
                                                                        }
                                                                    })
                                                                }).then(r => r.json()).then(d => {
                                                                    let pollTagsCopy = [...pollTags];
                                                                    let pollTagIdsCopy = [...pollTagIds];
                                                                    pollTagsCopy.push(d.data);
                                                                    pollTagIdsCopy.push(d.data.id);
                                                                    setPollTags(pollTagsCopy);
                                                                    setPollTagIds(pollTagIdsCopy);
                                                                }).catch(err => console.log(err));
                                                            }}>Create new category</button>
                                                }
                                            </div>
                                        </div>
                                    </div>

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
                                    questions && questions.map((q, i) => <div className='created-question' key={i}>
                                        <div>
                                            <span>
                                                <h4>{q.question}</h4>
                                                <h5>{q.type}</h5>
                                            </span>
                                            <span>
                                                <h3 onClick={() => {
                                                    let newArr = [...questions];
                                                    newArr.splice(i, 1);
                                                    setQuestions(newArr);
                                                }} className='X'>
                                                    x
                                                </h3>
                                            </span>
                                        </div>
                                        {
                                            q.options && q.options.map((o, j) => <span className='created-option' key={j}>
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
                                    <input type={"text"} value={currentQuestion} id='question' onChange={(e) => setCurrentQuestion(e.target.value)} /><br />
                                    {
                                        addImage
                                            ? <button className='scnd-btn'
                                                onClick={() => {
                                                    setAddImage(false)
                                                    setImageArray([])
                                                }}>Don't use images</button>
                                            : <button
                                                className='scnd-btn'
                                                onClick={() => setAddImage(true)}>Use images</button>
                                    }
                                </div>
                                <br />
                                <div>
                                    {
                                        (addImage && imageArray) && imageArray.map((imgUrl, i) =>
                                            <span key={i} className='img-span'>
                                                <img
                                                    alt={`image-${i + 1}`}
                                                    src={`http://localhost:1337${imgUrl}`}
                                                    width="200"
                                                />
                                                <p>{`Image ${i + 1}`}<span className='X' onClick={(e) => {
                                                    let arr = [...imageArray];
                                                    arr.splice((p, j) => j === 1);
                                                    setImageArray(arr);
                                                }}>x</span></p>
                                            </span>
                                        )
                                    }
                                    {
                                        addImage &&
                                        <form onSubmit={(e) => handleSubmitFile(e, fileToUpload)}>
                                            <input type={"file"} onChange={(e) => onChangeFile(e)} />
                                            <input type={"submit"} value="Submit" />
                                        </form>
                                    }
                                </div>
                                <br />
                                <div className='typeof-question'>
                                    <input
                                        type={"radio"}
                                        defaultChecked={false}
                                        id="radio"
                                        value="radio"
                                        name='question-type'
                                        onChange={(e) => {
                                            handleQuestion(e)
                                        }} />
                                    <label htmlFor='radio'>One-choice</label>

                                    <input
                                        type={"radio"}
                                        defaultChecked={false}
                                        id="checkbox"
                                        value="checkbox"
                                        name='question-type'
                                        onChange={(e) => {
                                            handleQuestion(e)
                                        }} />
                                    <label htmlFor='checkbox'>Multiple-choice</label>

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
                                                        x
                                                    </span>
                                                </span>
                                            })
                                        }
                                        <button className='scnd-btn' onClick={() => {
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
                                        images: addImage ? imageArray : [],
                                        options: (currentQuestionType === "radio" || currentQuestionType === "checkbox") ? currentOptions : []
                                    }
                                    let arr = [...questions];
                                    arr.push(questionObj);
                                    setQuestions(arr);
                                    setCurrentQuestion("");
                                    //setCurrentQuestionType("radio");
                                    setCurrentOptions(["", ""])
                                    setAddImage(false);
                                    setImageArray([]);
                                }
                            }}>
                                Add question
                            </button>
                        </div>
                        <div className='create-bottom'>
                            <button className='publish-btn' onClick={() => publishPoll()}>
                                Publish
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        )
    } else {
        return (
            <main className='main start-main'>
                <section className='section start-section'>
                    <div className='section-div'>
                        <h3>
                            You need to be logged in to make a poll.
                        </h3>
                        <Link to={"/login"}>

                        </Link>
                    </div>
                </section>
            </main>
        )
    }
}

export default CreatePoll;