import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import SignOut from './SignOut'
import { AuthUserContext, useAuthUser } from './Session';

const NavigationAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <SignOut />
        </li>
    </ul>
)

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
)

function Navigation() {
    const authUser = useAuthUser();

    return (
        <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
    );
}
export default Navigation
