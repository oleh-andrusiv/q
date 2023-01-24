import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { publishLogin } from "../../../../features/login/loginSlice";

import "./LoginForm.css";

const LoginForm = () => {
//   const { login } = useSelector((store) => console.log(store.login));
//   const { status } = useSelector((store) => store.posts);
//   const { error } = useSelector((store) => store.posts);

  const dispatch = useDispatch();

  const handleCreate = (event) => {
    event.preventDefault();
    dispatch(
        publishLogin({
        email: event.target.email.value,
        password: event.target.password.value,
      })
    );
  };
  // useEffect;
  return (
    <div className="login">
      <form action="#" onSubmit={handleCreate}>
        <label>
          Email
          <br />
          <input
            type="text"
            email="email"
            placeholder="Type here..."
            required
          />
        </label>
        <br />
        <br />
        <label>
          Password
          <br />
          <input
            type="text"
            password="password"
            placeholder="Type here..."
            required
          />
        </label>
        <br />
        <br />
        <input className="login_btn" value="Login" type="submit" />
      </form>
      {/* {login !== '' ? (
        <h5>You were successfuly loged in</h5>
      ) : (
        <h5>Please log in here</h5>
      )} */}
    </div>
  );
};

export default LoginForm;

