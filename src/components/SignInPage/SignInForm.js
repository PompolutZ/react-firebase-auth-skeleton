import React from "react";
import { useHistory } from "react-router-dom";

import { FirebaseContext } from "../../firebase";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

function SignInForm() {
  const [{ email, password, error }, setSignInFormState] = React.useState(
    INITIAL_STATE
  );
  const firebase = React.useContext(FirebaseContext);
  const history = useHistory();

  const isInvalid = password === "" || email === "";

  const onChange = event => {
    const { name, value } = event.target;
    setSignInFormState(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = event => {
    firebase
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSignInFormState(INITIAL_STATE);
        history.goBack();
      })
      .catch(error => {
        setSignInFormState(prev => ({ ...prev, error: error }));
      });

    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

export default SignInForm;
