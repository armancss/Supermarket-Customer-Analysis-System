import React, { useState } from "react";
import "../Cam_Feed/Cam_Feed.scss"
import { Link } from "react-router-dom";
export const Login = (props) => {
    const [email , setEmail]= useState('');
    const [pass, setPass]= useState('');
    const handleSubmit= (e) => {
              e.preventDefault();
              console.log(email);

    }
    return(
        <>
        <div className="wrapper-login">
            <h1 className="main-title">Supermarket Customer Analysis</h1>
            <div className="auth-form-container" >
                <h2 className="title__h2">Login</h2>
            <form className="login-form" onSubmit={(handleSubmit)}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>

                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e)=> setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>  
                <Link to="/cam" className="button button__green">
                    <span>Log In</span>
                </Link>
            </form>
            <Link to="/register" className="button">
                <span>Register</span>
            </Link>
            </div>
        </div>
         </>
    
    )
}
    
{/* <button type="submit">Log In</button> */}
{/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}> Don't have an account? Register here.</button> */}