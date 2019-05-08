import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

function useAuthUser(redirectUnauthorizedUser) {
    const [authUser, setAuthUser] = useState(null);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const releaseAuthListener = firebase.auth.onAuthStateChanged(user => {
            if(user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
                if(redirectUnauthorizedUser) {
                    redirectUnauthorizedUser();
                }
            }
        });

        return () => releaseAuthListener();
    }, [])

    return authUser;
}

export default useAuthUser;