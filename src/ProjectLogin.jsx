import {React,useState} from 'react'
import Style from "./SignUp.module.css"

const ProjectLogin = () => {
    const [response, setResponse] = useState("");
    const [url, setUrl] = useState("");


    const initialValues = {userEmail: "", userPassword: "" };
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
          "userPassword": formValues.userPassword
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch("http://localhost:8080/api/data/get/data", requestOptions)
          .then(response => response.json())
          .then(res => {setResponse(res.message)
          if (res.data.userRole == "ADMIN")
        {
          setUrl("/Admin")
        }
        else if (res.data.userRole == "USER")
        {
          setUrl("/User")
        }
        else
        {
          console.log("Invalid");
        }
      })
          .catch(error => setResponse(error.message));


        }


  return (
   <>
        <form className={Style.form} action={url} method="POST">
            <h1><u>Login Form</u></h1>
        <div className={Style.labinp}>
            <div className={Style.label}>
                <label htmlFor="userEmail">Enter your Email :- </label>
                <label htmlFor="userPassword" id="user">Enter your Password :- </label>
            </div>
            <div className={Style.input}>
                <input type="text" placeholder='Enter your Email' value={formValues.userEmail}
                name="userEmail"
                onChange={handleChange}
                />
                <input type="password" placeholder='Enter your password' value={formValues.userPassword}
                name="userPassword"
                onChange={handleChange}
                />
                <a href='/ForgotPassword' className={Style.an}>Forgot Password?</a>
            </div>
            </div>

            <button onClick={submitData}>login</button>
            <a href={url}><h1>{response}</h1></a>
            {/* <h1>{response} click here to continue</h1> */}
        </form>
   </>
  )
}

export default ProjectLogin;