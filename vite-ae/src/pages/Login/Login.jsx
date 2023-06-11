import React, { useState } from "react";
import "../Cam_Feed/Cam_Feed.scss"
import { Link, useNavigate } from "react-router-dom";
import validation from "./LoginValidation";
import axios from 'axios';
export const Login = (props) => {
    const [email , setEmail]= useState('');
    const [pass, setPass]= useState('');
    const [values,setValues]= useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const [errors, setErrors]= useState([])
    const handleInput= (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }
    const handleSubmit= (e) => {
        e.preventDefault();
        const err = validation(values);
        setErrors(err);
        if(err.email === "" && err.password === "" ) {
            axios.post('http://localhost:8081/login', values )
            .then( res => {
                if(res.data === "Success"){

                
                navigate('/cam');

                }
                else {
                    alert("No record existed");
                }
            })
            .catch(err=> console.log(err))
        }

}
    

    return(
        <>
        <div className="wrapper-login">
            <h1 className="main-title">Supermarket Customer Analysis</h1>
            <div className="auth-form-container" >
                <h2 className="title__h2">Login</h2>
            <form className="login-form" onSubmit={(handleSubmit)}>
                <label htmlFor="email">Email</label>
                <input onChange={(handleInput)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                { errors.email && <span className= "text-danger"> {errors.email} </span>}

                <label htmlFor="password">Password</label>
                <input  onChange={(handleInput)} type="password" placeholder="********" id="password" name="password"/>  
                { errors.password && <span className= "text-danger"> {errors.password} </span>}
                <button type='submit' className='button'> Log in</button> 
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