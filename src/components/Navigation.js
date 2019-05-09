import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import * as ROLES from '../constants/roles'
import SignOut from './SignOut'
import { useAuthUser } from './Session'

function NavigationAuth({ authUser }) {
    return (
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
            {
                !!authUser.roles[ROLES.ADMIN] && (
                    <li>
                        <Link to={ROUTES.ADMIN}>Admin</Link>
                    </li>
                )
            }
            <li>
                <SignOut />
            </li>
        </ul>
    )
}

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
    const authUser = useAuthUser()

    return <div>{authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}</div>
}
export default Navigation
