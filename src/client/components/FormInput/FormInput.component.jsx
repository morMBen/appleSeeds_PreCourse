/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';

import './FormInput.styles.css';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />
  </div>
);

export default FormInput;
