import React from 'react';
import { withRouter } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

function SignUpForm({ history }) {
    const firebase = React.useContext(FirebaseContext);

    const [
        { username, email, passwordOne, passwordTwo, error },
        setSignUpFormState,
    ] = React.useState(INITIAL_STATE)

    const onSubmit = event => {
        firebase.createUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                setSignUpFormState(INITIAL_STATE);
                history.push(ROUTES.HOME);
            })
            .catch(error => setSignUpFormState(prev => ({ ...prev, error: error })));
    
        event.preventDefault(); 
    }

    const onChange = event => {
        const { name, value } = event.target;
        setSignUpFormState(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="username"
                value={username}
                onChange={onChange}
                type="text"
                placeholder="Full Name"
            />
            <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <button type="submit" disabled={isInvalid}>
                Sign Up
            </button>

            {error && <p>{error.message}</p>}
        </form>
    )
}

export default withRouter(SignUpForm);
