import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';

import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ListJokes from './components/ListJokes';

const authUrl = 'http://localhost:3300'

function App() {
  const [user, setUser] = useState([]);
  const [jokes, setJokes] = useState([]);
  const [token, setToken] = useState(false);
  const [requestError, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async (userObject) => {
    setLoading(true);
    try {
      await axios.post(`${authUrl}/api/register`, userObject);
      const signedInUser = await signIn(userObject)
      setUser(signedInUser.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (userObject) => {
    setLoading(true);
    try {
      const user = await axios.post(`${authUrl}/api/login`, userObject);
      setToken(true);
      await localStorage.setItem('token', user.data.token);
      setUser(user.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getJokes = async () => {
    try {
      const jokes = await axios.get(`${authUrl}/api/jokes`);
      setJokes(jokes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <Router>
        <div className="App">
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '20px'
            }}
          >
            <NavLink
              to="/"
              exact
            >
              Jokes
          </NavLink>

            <NavLink
              to="/sign-in"
            >
              SignIn
          </NavLink>

            <NavLink
              to="/sign-up"
            >
              SignUp
          </NavLink>
          </nav>

          <Route
            path="/"
            render={props => (
              <ListJokes
                {...props}
                jokes={jokes}
                user={user}
                error={requestError}
                loading={loading}
              />
            )}
          />

          <Route
            path="/sign-in"
            render={props => (
              <SignIn
                {...props}
                // signIn={signIn}
              />
            )}
          />

          <Route
            path="/sign-up"
            render={props => (
              <SignUp
                {...props}
                // signUp={signUp}
              />
            )}
          />

        </div>
      </Router>
    </div>
  );
}

export default App;
