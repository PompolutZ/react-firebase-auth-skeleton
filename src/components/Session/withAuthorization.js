import React from 'react'
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import useAuthUser from './useAuthUser';

const withAuthorization = condition => Component => {
    function WithAuthorization(props) {
        const authUser = useAuthUser(() => props.history.push(ROUTES.SIGN_IN));

        return condition(authUser) ? <Component {...props} /> : null;
    }

    return withRouter(WithAuthorization);
}

export default withAuthorization;
