import React from 'react';
import { withAuthorization } from './Session';

function Home() {
    return (
        <div>
            Home
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);