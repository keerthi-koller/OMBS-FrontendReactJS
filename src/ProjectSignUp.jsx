import { React, useState } from "react";
import Style from "./SignUp.module.css"

const ProjectSignUp = () => {
  const [response, setResponse] = useState("");
  const initialValues = {
    firstName: "",
    lastName: "",
    user_Role: {
        userRole: "",
    },
    userEmail: "",
    userPassword: "",
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
        "firstName": formValues.firstName,
        "lastName": formValues.lastName,
        "user_Role": {
            "userRole": formValues.user_Role,
        },
        "userEmail": formValues.userEmail,
        "userPassword": formValues.userPassword,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:8080/api/data/save", requestOptions)
      .then((response) => response.json())
      .then((res) => setResponse(res.message))
      .catch((error) => setResponse(error.message));
  };
  return (
    <>
      <form className={Style.form}>
          <h1><u>SingUp Form</u></h1>
        <div className={Style.labinp}>
          <div className={Style.label}>
                <label htmlFor="firstName">Enter your First Name :- </label>
                <label htmlFor="lastName">Enter your Last Name :- </label>
                <label htmlFor="userRole">Enter UserRole :- </label>
                <label htmlFor="userEmail">Enter your Email :- </label>
                <label htmlFor="Password">Enter your Password :- </label>
          </div>
          <div className={Style.input}>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your firstname"
              value={formValues.firstName}
              onChange={handleChange}
            />
            <input
            type="text"
            name="lastName"
            placeholder="Enter your lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />
          <select name="user_Role" onChange={handleChange} value={formValues.user_Role.userRole}>
            <option>SELECT</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
          <input
            type="text"
            name="userEmail"
            placeholder="Enter your Email"
            value={formValues.userEmail}
            onChange={handleChange}
          />
          <input
            type="text"
            name="userPassword"
            placeholder="Enter your password"
            value={formValues.userPassword}
            id="password"
            onChange={handleChange}
          />
          </div>
        </div>
          {/* <h1>{response}</h1> */}
          <button onClick={submitData}>SignUp</button>
      </form>
    </>
  );
};

export default ProjectSignUp;
