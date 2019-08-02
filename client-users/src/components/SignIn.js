import React from 'react'
import { Redirect } from 'react-router-dom';

const SignIn = ({ signIn, token }) => {
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const onSignIn = (event) => {
    event.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }
    signIn(user)
    usernameRef.current.value = '';
    passwordRef.current.value = '';
  }

  return (

    <div>
      {
        token 
          ? <Redirect to="/users" />
          : null
      }
      <form onSubmit={event => onSignIn(event)}>
        <input
          type='text'
          placeholder='username'
          ref={usernameRef}
        />
        <input
          type='password'
          placeholder='password'
          ref={passwordRef}
        />
        <input
          type='submit'
          value='Sign In'
        />
      </form>
    </div>
  )
}

export default SignIn
