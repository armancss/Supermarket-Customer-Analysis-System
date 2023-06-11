import React, { useState } from "react";
import "../Cam_Feed/Cam_Feed.scss"
import { Link, useNavigate } from "react-router-dom";
import validation from "./RegistrationValidation";
import axios from 'axios';

export const Register = (props) => {
    const [values,setValues]= useState({
        name: '',
        email:'',
        password:''
    })
    const navigate= useNavigate();
    const [errors, setErrors]= useState([])
    const handleInput= (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }
    const handleSubmit= (e) => {
        e.preventDefault();
        const err= validation(values);
        setErrors(err);
        if(err.name === "" && err.email === "" && err .password === "" ) {
            axios.post('http://localhost:8081/signup', values )
            .then( res => {
                navigate('/');
            })
            .catch(err => console.log(err))
        }

}
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

   

    return (
        <div className="wrapper-login">
            <h1 className="main-title">Supermarket Customer Analysis</h1>
            <div className="auth-form-container">
                <h2 className="title__h2">Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name:</label>
                    <input type="text" name="name" onChange={(handleInput)} id="name" placeholder="Full Name" />
                    { errors.name && <span className= "text-danger"> {errors.name} </span>}

                    <label htmlFor="email">Email:</label>
                    <input  type="email" onChange={(handleInput)} placeholder="youremail@gmail.com" id="email" name="email" />
                    { errors.email && <span className= "text-danger"> {errors.email} </span>}
                    
                    <label htmlFor="password">Password:</label>
                    <input type="password"  onChange={(handleInput)}  placeholder="********" id="password" name="password" />
                    { errors.password && <span className= "text-danger"> {errors.password} </span>}
                
                    <button type='submit' className='button'> Sign up</button>
                </form>
            <Link to="/">
                <button className="link-btn">Already have an account? Login here.</button>
            </Link>
            </div>
        </div>
    )
}
{/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}