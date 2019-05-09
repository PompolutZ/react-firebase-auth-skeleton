import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../../firebase';

const withAuthorization = condition => Component => {
    function WithAuthorization(props) {
        const firebase = useContext(FirebaseContext);

        useEffect(() => {
            const releaseAuthListener = firebase.onAuthUserListener(
                authUser => {
                    if(!condition(authUser)) {
                        props.history.push(ROUTES.SIGN_IN);
                    }
                },
                () => props.history.push(ROUTES.SIGN_IN)
            );
    
            return () => releaseAuthListener();
        }, []);
        
        return <Component {...props} />;
    }

    return withRouter(WithAuthorization);
}

export default withAuthorization;
