import React from 'react'
import Style from "./SignUp.module.css"

const Admin = () => {
  return (
    <div className={Style.adminDiv}>
      <h1><u>WELCOME ADMIN</u></h1>
      <div className={Style.adminButton}>
        <button><a href="/ProjectSignUp">Add User</a></button>
        <button><a href="/ProductsTable">Products Info</a></button>
      </div>
    </div>
  )
}

export default Admin
