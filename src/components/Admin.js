import React, { useState, useEffect, useContext } from 'react'
import { withAuthorization } from './Session'
import * as ROLES from '../constants/roles'
import { FirebaseContext } from '../firebase'

function AdminPage() {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        setLoading(true)

        firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val()

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }))

            setUsers(usersList)
            setLoading(false)
        })

        return () => firebase.users().off()
    }, [])

    return (
        <div>
            <h1>Admin</h1>

            {loading && <div>Loading...</div>}

            <UserList users={users} />

            <p>
                Restricted area! Only users with the admin role are authorized.
            </p>
        </div>
    )
}

const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    <strong>ID:</strong> {user.uid}
                </span>
                <span>
                    <strong>E-Mail:</strong> {user.email}
                </span>
                <span>
                    <strong>Username:</strong> {user.username}
                </span>
            </li>
        ))}
    </ul>
)

const condition = authUser => !!authUser // && !!authUser.roles[ROLES.ADMIN]

export default withAuthorization(condition)(AdminPage)
