import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ANSWER_QUESTION, REMOVE_POLL, UPDATE_POLL } from './texts';

const initState = {
  poll: localStorage.getItem("chosenPoll") ? JSON.parse(localStorage.getItem("chosenPoll")) : {}
}

function reducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_POLL:
      localStorage.setItem("chosenPoll", JSON.stringify(action.payload))
      return {
        ...state,
        poll: action.payload
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        poll: {}
      };
    case REMOVE_POLL:
      localStorage.setItem("chosenPoll", "{}")
      return {
        ...state,
        poll: {}
      };
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
