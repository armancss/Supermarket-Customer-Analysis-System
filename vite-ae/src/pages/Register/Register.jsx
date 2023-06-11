import React, { useState } from "react";
import "../Cam_Feed/Cam_Feed.scss"
import { Link } from "react-router-dom";
export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="wrapper-login">
            <h1 className="main-title">Supermarket Customer Analysis</h1>
            <div className="auth-form-container">
                <h2 className="title__h2">Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name:</label>
                    <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />

                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password">Password:</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                
                    <Link to="/" className="button">
                        <span>Register</span>
                    </Link>
                </form>
            <Link to="/">
                <button className="link-btn">Already have an account? Login here.</button>
            </Link>
            </div>
        </div>
    )
}
{/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}