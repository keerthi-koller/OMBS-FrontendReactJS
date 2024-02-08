import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Style from "./SignUp.module.css"

const Layout = () => {
  return (
    <section className={Style.navbar}>
        <div className={Style.navh1}>
            <h1>Welcome</h1>
        </div>
        <div className={Style.navlinks}>
            <ul>
                <li>
                    <Link to="/" className={Style.link}>Home</Link>
                </li>
                <li>
                    <Link to="/ProjectSignUp" className={Style.link}>SignUp</Link>
                </li>
                <li>
                    <Link to="/ProjectLogin" className={Style.link}>Login</Link>
                </li>
                <li>
                    <Link to="/Admin" className={Style.link}>Admin</Link>
                </li>
                <li>
                    <Link to="/User" className={Style.link}>User</Link>
                </li>
                <li>
                    <Link to="/ProductsTable" className={Style.link}>ProductsTable</Link>
                </li>
            </ul>
        </div>
        <Outlet/>
    </section>
  )
}

export default Layout
