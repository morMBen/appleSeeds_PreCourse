/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';

import './QuestionDescription.styles.css';

const QuestionDescription = ({ question }) => (
  <div className="question-description">
    {question}
  </div>
);

export default QuestionDescription;
