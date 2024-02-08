import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import ProjectSignUp from './ProjectSignUp';
import ProjectLogin from './ProjectLogin';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import Admin from './Admin';
import User from './User';
import PasswordReset from './PasswordReset';
import ProductsTable from './ProductsTable';


const App = () => {
  return (
    <div>
      <Router>
        <Layout/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/ProjectSignUp' element={<ProjectSignUp/>} />
          <Route path="/ProjectLogin" element={<ProjectLogin/>} />
          <Route path='/ForgotPassword' element={<ForgotPassword/>} />
          <Route path='/Admin' element={<Admin/>} />
          <Route path='/User' element={<User/>} />
          <Route path='/PasswordReset' element={<PasswordReset/>} />
          <Route path='/ProductsTable' element={<ProductsTable/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
