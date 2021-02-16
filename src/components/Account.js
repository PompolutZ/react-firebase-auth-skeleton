import React from 'react';

import { useAuthUser, withAuthorization } from './Session';

function AccountPage() {
    const authUser = useAuthUser();

    if(!authUser) return <h1>User Unknown</h1>

    return (
        <div>
            <h1>Account: {authUser.email}</h1>
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);