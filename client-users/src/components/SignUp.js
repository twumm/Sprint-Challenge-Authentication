import React from 'react'

const SignUp = ({ signUp }) => {
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();
  const departmentRef = React.createRef();

  const onSignUp = (event) => {
    event.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      department: departmentRef.current.value,
    }
    signUp(user);
    usernameRef.current.value = '';
    passwordRef.current.value = '';
    departmentRef.current.value = '';
  }

  return (
    <div>
      <form onSubmit={event => onSignUp(event)}>
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
          type='text'
          placeholder='department'
          ref={departmentRef}
        />
        <input
          type='submit'
          value="Sign Up"
        />
      </form>
    </div>
  )
}

export default SignUp
