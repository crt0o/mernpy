import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

function App() {
  let [input, setInput] = useState('');
  let [processedText, setProcessedText] = useState('');

  const handleInputChange = e => setInput(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await axios.post('/api', {
      text: input
    });

    setProcessedText(res.data.text);
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} value={input} />
        <button type="submit">Submit</button>
      </form>
      <p>{processedText}</p>
    </React.Fragment>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
