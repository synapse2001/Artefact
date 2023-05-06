import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "../firebase"
import "../styles/SignIn.css"
import googleSigninImgDark from '../assets/google_signin.png';
import googleSigninImgLight from '../assets/google_signin_light.png';
import { useFirebase } from "../context/firebase";

const auth = getAuth(app);


const SignInPage = () => {
    const firebase = useFirebase();
    console.log(firebase);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function signInHandler(){
        setLoading(true);
        firebase.signinUser(email,password)
        .then( ()=>{setLoading(false);alert("Success");firebase.putData('login_users/' + 'identity', { email})})
        .catch((error)=>{console.log(error);setLoading(false);alert(error)});
    }
    function handleGoogleSignin(){
        setLoading(true);
        // alert("signin called");
        firebase.signinwithGoogle()
    }
    return (
        <html>
        <head>
        <title>My Sign In page </title>
        <link rel="stylesheet" href="./styles/SignIn.css"></link>
        </head>
            <body className="signinbody">
                <section className="animated-background">
                    <div id="stars1"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </section>
                
                <div className="signin-page">
                <center>
                    <h1 className="title">Artefact</h1>
                </center>
                    <div className="container">
                    <label>Email</label>
                    <input 
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email" 
                        required 
                        placeholder="Enter your Email here"
                        ></input>
                    <label>Password</label>
                    <input 
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password" 
                        required 
                        placeholder="Enter your Password here">
                    </input>
                    </div>
                    <button id = "signin-button" onClick={()=> signInHandler()}>{loading ? "Loading..." : "Sign In"}</button>
                    <img className="signin-img" onClick={() => handleGoogleSignin()} src= {googleSigninImgLight} alt="Sign in with Google"></img>
                </div>
            </body>
    </html>
    )
}

export default SignInPage;