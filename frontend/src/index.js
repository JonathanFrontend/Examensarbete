import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ANSWER_QUESTION, REMOVE_POLL, UPDATE_POLL, RESET } from './texts';

// poll: localStorage.getItem("chosenPoll") ? JSON.parse(localStorage.getItem("chosenPoll")) : {}
// localStorage.getItem("answeredQuestions") ? JSON.parse(localStorage.getItem("answeredQuestions")) : []

const initState = {
  pollInfo: localStorage.getItem("pollInfo") ? JSON.parse(localStorage.getItem("pollInfo")) : {},
  pollQuestions: localStorage.getItem("pollQuestions") ? JSON.parse(localStorage.getItem("pollQuestions")) : [],
  answeredQuestions: localStorage.getItem("answeredQuestions") ? JSON.parse(localStorage.getItem("answeredQuestions")) : []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_POLL:
      localStorage.setItem("pollInfo", JSON.stringify(action.payload.pollInfo));
      localStorage.setItem("pollQuestions", JSON.stringify(action.payload.pollQuestions));
      return {
        ...state,
        pollInfo: action.payload.pollInfo,
        pollQuestions: action.payload.pollQuestions
      };

    case ANSWER_QUESTION:
      let stateCopy = { ...state };
      let aqCopy = [...stateCopy.answeredQuestions];

      for (let i = 0; i < aqCopy.length; i++) {
        if (aqCopy[i].indexOfQuestion == action.payload.indexOfQuestion) {
          // console.log("aqCopy.splice(i, 1);", aqCopy, aqCopy.length)
          if (aqCopy.length > 0) {
            aqCopy.splice(i, 1);
          } else if (aqCopy.length === 0) {
            aqCopy = [];
          }

        }
      }
      aqCopy.push(action.payload);

      // localStorage.setItem("answeredQuestions", JSON.stringify(stateCopy.answeredQuestions));
      aqCopy.sort((a, b) => a.indexOfQuestion - b.indexOfQuestion);
      localStorage.setItem("answeredQuestions", JSON.stringify(aqCopy));
      return {
        ...state,
        answeredQuestions: aqCopy
      };

    case RESET:
      localStorage.setItem("pollInfo", JSON.stringify({}));
      localStorage.setItem("pollQuestions", JSON.stringify([]));
      localStorage.setItem("answeredQuestions", JSON.stringify([]));
      return {
        ...state,
        pollInfo: {},
        pollQuestions: [],
        answeredQuestions: []
      }

    default:
      return state;
  }
}

const store = createStore(reducer);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
