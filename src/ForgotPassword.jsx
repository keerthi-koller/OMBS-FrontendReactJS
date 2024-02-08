import React, { useState } from 'react'
import Style from "./SignUp.module.css"
import PasswordReset from './PasswordReset';

const ForgotPassword = () => {
    const [response, setResponse] = useState("");
    const initialValues = {userEmail: "", };
    const [formValues, setFormValues] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
        console.log(formValues);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const submitData = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "userEmail": formValues.userEmail,
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch("http://localhost:8080/api/data/post/mail/data", requestOptions)
          .then(response => response.json())
          .then(res => setResponse(res.message))
          .catch(error => setResponse(error.message));
        }

  return (
    <>
        <form className={Style.form}>
            <h1><u>Forgot Password</u></h1>
            <div className={Style.labinp}>
                <div className={Style.label}>
                    <label htmlFor="userEmail">Enter verified Email id :- </label>
                </div>
                <div className={Style.input}>
                    <input type="email" placeholder='Enter your mail id' value={formValues.userEmail} name='userEmail' onChange={handleChange} />
                </div>
            </div>
            <button onClick={submitData}>Submit</button>
            <h1>{response}</h1>
        </form>
    </>
  )
}

export default ForgotPassword
