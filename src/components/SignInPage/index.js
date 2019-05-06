import React from 'react'

import { SignUpLink } from '../SignUpPage'
import SignInForm from './SignInForm';

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <SignUpLink />
    </div>
)

export default SignInPage

export { SignInForm }
