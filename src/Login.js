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
    const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
   

    const loginProps = useSpring({ 
        left: registrationFormStatus ? -500 : 0, // Login form sliding positions
    });
    const registerProps = useSpring({
          
        left: registrationFormStatus ? 0 : 500, // Register form sliding positions 
    });
    function registerClicked() {
        setRegistartionFormStatus(true);
      }
    function loginClicked() {
        setRegistartionFormStatus(false);
    }
    const loginBtnProps = useSpring({
        borderBottom: registrationFormStatus 
          ? "solid 0px transparent"
          : "solid 2px #FE4B3D",  //Animate bottom border of login button
    });
    const registerBtnProps = useSpring({
        borderBottom: registrationFormStatus
          ? "solid 2px #FE4B3D"
          : "solid 0px transparent", //Animate bottom border of register button
    });

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
    const demoLogin = (e) => {
        dispatch(login({
            email: "demo@demo.com",
            uId: ("demoId"),
            displayName: "demoUser",
            avatar: "/images/zeus.png",
        }))
    }

    return (
        <div className = "container">
            <div className = "login">
        
                <img src="/images/banner1.png" alt="" />"
                
                <div className = "nav__buttons">
                    <animated.button 
                       onClick = {loginClicked}
                       style = {loginBtnProps}
                    >Sign In</animated.button>
                    
                    <animated.button 
                       onClick={registerClicked}
                       style = {registerBtnProps}
                    >Register</animated.button>
                    
                </div>
                {!registrationFormStatus && <div className = "login__registerForm">
                <animated.form action = "" id = "loginForm" style = {loginProps}>
                    
                    <input value ={email} onChange = {e => setEmail(e.target.value)} type = "email" placeholder = "email" />
                    <input value ={password} onChange = {e => setPassword(e.target.value)} type = "password" placeholder = "Password" />
                    <Button type = "submit" onClick = {loginToApp}>Sign In</Button>
                    <Button type = "submit" onClick = {demoLogin}>Demo Sign In</Button>
                    {/* <Button type = "submit" onClick = {demoLogin}>Sign up With Google</Button> */}
                </animated.form> 
                </div>}

                {registrationFormStatus && <div className = "login__registerForm">
                
                <animated.form  action = "" id = "registerForm" style = {registerProps}>
                    <input value ={name} onChange = {e => setName(e.target.value)} type ="text" placeholder = "Full Name (Required if Registering)" />
                    <input value ={profilePic} onChange = {e => setProfilePic(e.target.value)} type ="text" placeholder ="Upload Profile Picture" />
                    {/* <input type="file" onChange = {onFileChange} id="actual-btn" hidden /> */}
                    <input value ={email} onChange = {e => setEmail(e.target.value)} type = "email" placeholder = "email" />
                    <input value ={password} onChange = {e => setPassword(e.target.value)} type = "password" placeholder = "Password" />
                    <Button type = "submit" onClick = {loginToApp}>Register</Button>                        
                </animated.form> 
                
                </div>}                
                    
            </div>
        </div>
        
    )
}


export default Login
