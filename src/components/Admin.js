import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withAuthorization } from './Session';
import * as ROLES from '../constants/roles';
import * as ROUTES from '../constants/routes';
import { FirebaseContext } from '../firebase';

function AdminPage() {
    return (
        <div>
            <h1>Admin</h1>
            <p>The Admin Page is accessible by every signed in admin user.</p>

            <Switch>
                <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
                <Route exact path={ROUTES.ADMIN} component={UserList} />
            </Switch>

            {/*  */}

            {/* <UserList users={users} /> */}
        </div>
    );
}

const UserItem = (props) => {
    console.log();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({...props.location.state.user});
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        if(user) return;
        
        setLoading(false);

        firebase.user(props.match.params.id).on('value', snapshot => {
            setUser(snapshot.val());
            setLoading(false);
        });

        return () => firebase.user(props.match.params.id).off();
    }, []);

    return (
        <div>
            <h2>User ({props.match.params.id})</h2>
            {loading && <div>Loading ...</div>}

            {user && (
                <div>
                    <span>
                        <strong>ID:</strong> {user.uid}
                    </span>
                    <span>
                        <strong>E-Mail:</strong> {user.email}
                    </span>
                    <span>
                        <strong>Username:</strong> {user.username}
                    </span>
                </div>
            )}
        </div>
    );
};

function UserList() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        setLoading(true);

        firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            setUsers(usersList);
            setLoading(false);
        });

        return () => firebase.users().off();
    }, []);

    return (
        <div>
            <h2>Users</h2>
            {loading && <div>Loading...</div>}
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
                        <span>
                            <Link to={{
                                pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                state: { user }
                            }}>
                                Details
                            </Link>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AdminPage);
