import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { login} from './features/userSlice';
import { auth } from './firebase';
import "./Login.css";
import {useSpring, animated} from "react-spring";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState ("");
    const [profilePic, setProfilePic] = useState ("");
    const dispatch = useDispatch();



    const register = () => {
        if (!name){
            return alert("Please Enter a Full Name")
        }
        auth.createUserWithEmailAndPassword(email,password).then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic,
            }).then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uId: userAuth.user.uId,
                    displayName: name,
                    photoUrl: profilePic,
                })
                );
            }); 
        }).catch((error) => alert(error));
    };

    const loginToApp = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(userAuth => {
            dispatch(login({
                email: userAuth.email,
                uId: userAuth.uId,
                displayName: userAuth.displayName,
                avatar: userAuth.photoURL,
            }))
        }).catch(error => alert(error));
    };

    return (
        <div className = "container">
            <div className = "login">
        
                <img src="/images/banner1.png" alt="" />"
                
                <div className = "nav__buttons">
                    <animated.button 
                       
                    >Sign In</animated.button>
                    <animated.button 
                       
                    >Register</animated.button>
                    
                </div>
                <form>
                    <input value ={name} onChange = {e => setName(e.target.value)} type ="text" placeholder = "Full Name (Required if Registering)" />
                    <input value ={profilePic} onChange = {e => setProfilePic(e.target.value)} type ="text" placeholder ="Upload Profile Picture" />
                    {/* <input type="file" onChange = {onFileChange} id="actual-btn" hidden /> */}
                    <input value ={email} onChange = {e => setEmail(e.target.value)} type = "email" placeholder = "email" />
                    <input value ={password} onChange = {e => setPassword(e.target.value)} type = "password" placeholder = "Password" />
                    <Button type = "submit" onClick = {loginToApp}>Sign In</Button>
                </form>   
                <p> Not a Member?  

                    <span className = "login__register" onClick = {register}> Register Now</span>
                </p>         
            </div>
        </div>
        
    )
}

export default Login
