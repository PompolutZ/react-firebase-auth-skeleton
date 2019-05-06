import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

function useAuthUser() {
    const [authUser, setAuthUser] = useState(null);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth.onAuthStateChanged(authUser => {
            authUser ? setAuthUser(authUser) : setAuthUser(null)
        });

        return () => listener();
    }, []);

    return authUser;
}

export default useAuthUser;