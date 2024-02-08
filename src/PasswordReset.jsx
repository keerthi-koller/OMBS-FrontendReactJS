import React, { useState } from 'react'
import Style from "./SignUp.module.css"

const PasswordReset = (props) => {
  const [response, setResponse] = useState("");
  const initialValues = {
    userPassword: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const submitData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "userPassword": formValues.userPassword,
        "confirmPassword": formValues.confirmPassword,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:8080/api/data/update/data", requestOptions)
      .then((response) => response.json())
      .then((res) => setResponse(res.message))
      .catch((error) => setResponse(error.message));
  };
  return (
    <>
      <form className={Style.form}>
          <h1><u>Reset Password</u></h1>
        <div className={Style.labinp}>
          <div className={Style.label}>
                <label htmlFor="Password">Enter your Password :- </label>
                <label htmlFor="Password">Re-enter Password :- </label>
          </div>
          <div className={Style.input}>
          <input
            type="text"
            name="userPassword"
            placeholder="Enter your password"
            value={formValues.userPassword}
            onChange={handleChange}
          />
          <input
            type="text"
            name="confirmPassword"
            placeholder="Enter your password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          </div>
        </div>
          {/* <h1>{response}</h1> */}
          <button onClick={submitData}>Reset</button>
      </form>
    </>
  )
}

export default PasswordReset
