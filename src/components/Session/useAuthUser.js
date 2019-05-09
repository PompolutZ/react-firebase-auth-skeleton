import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

function useAuthUser() {
    const [authUser, setAuthUser] = useState(null);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const releaseAuthListener = firebase.onAuthUserListener(
            authUser => {
                setAuthUser(authUser);
            },
            () => {
                setAuthUser(null);
            }
        )

        return () => releaseAuthListener();
    }, [])

    return authUser;
}

export default useAuthUser;
