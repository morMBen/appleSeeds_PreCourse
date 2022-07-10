/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import FormInput from '../../components/FormInput/FormInput.component';

import './LoginPage.styles.css';

const LoginPage = () => {
  const history = useHistory();

  const [currentState, setCurrentState] = useState({
    email: '',
    passportId: '',
  });

  React.useEffect(() => {}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('api/users/login', currentState).then((res) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userData', JSON.stringify(res.data.user));
          if (res.data.user.role === 'user') {
            history.push('/');
          } else if (res.data.user.role === 'admin') {
            history.push('/');
          }
        }
      });
    } catch (e) {
      console.log('error in handle submit of sign in', e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentState((oldState) => ({ ...oldState, [name]: value }));
  };

  const { email, passportId } = currentState;

  return (
    <div className='login-page'>
      <div className='login-picture'>
        <h1 className='welcome'> Welcome to AppleSeed's</h1>
      </div>
      <div className='login-form'>
        <form
          className='sign-up-form'
          onSubmit={(event) => handleSubmit(event)}
        >
          <h2>Sign In to AppleSeed's </h2>
          <div className='text-box'>
            <i className='fa fa-user' aria-hidden='true'>
              {' '}
              Email
            </i>
            <FormInput
              type='email'
              name='email'
              value={email}
              onChange={(event) => handleChange(event)}
              label='Display Name'
              required
            />
          </div>
          <div className='text-box'>
            <i className='fa fa-lock' aria-hidden='true'>
              {' '}
              Password(id)
            </i>
            <FormInput
              type='password'
              name='passportId'
              value={passportId}
              onChange={(event) => handleChange(event)}
              label='Display Name'
              required
            />
          </div>
          <input type='submit' className='signin-btn' value='Sign In!' />
        </form>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
