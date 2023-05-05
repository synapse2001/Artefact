import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { app } from "./firebase";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import SignUpPage from "./pages/SignUp";
import WelcomePage from "./pages/Welcome"
import TestPage from "./pages/Test"
import SignInPage from "./pages/SignIn";
import LoadingPage from "./pages/LoadingPage";
import { auth } from './context/firebase';
import { useFirebase } from './context/firebase';
import { useAuth } from './controllers/userState';
import HomePage from './pages/HomePage';
import PodcastDataProvider from './assets/audio';
import PodcastPlayer from './assets/audio';
import TakeOff from './pages/TakeoffPage';
import Level3 from './pages/Level3';
import Level2 from './pages/Level2';
import Level5 from './pages/Level5';
import Certificate from './pages/Certificate';
import Deadend from './pages/Deadend';
import Leaderboard from './pages/Welcome';



function App() {

  // const[isloading ,setisLoading] =useState(true);

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userLevel, setUserLevel] = useState(0);
  const [uid, setUid] = useState("");
  const firebase = useFirebase();
  let resume;
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // firebase.fetchPoddata();
      // alert(firebase.podData.timestamp.ct)
      // setisResume(firebase.podData.timestamp.ct)
    }, 1000); // Replace this with your Firebase auth state listener
  }, []);

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      setUid(userId)
      firebase.fetchData('users' + userId).then(
        data => {
          const currlevel = data.level;
          setUserLevel(currlevel);
          console.log(userLevel);
          // window.location.href = '/level' +userLevel
        }
      )
    }
  }, [user, firebase]);


  if (isLoading) {
    return <LoadingPage />
  }

  if (user === null) {
    if (window.location.pathname === "/SignInPage") {
      return <SignInPage />;
    }
    return <SignUpPage />;
  } 
  else {
    if(user){
    const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
    const userEmail = user.email;
    const userId = user.uid;
    const userName = user.displayName;

    if (isNewUser) {
      firebase.putData('users' + userId, { userEmail});
      firebase.putData('users' + userId, { timeTaken: {durationMin: 0}});
      firebase.putData('users' + userId, { userName });
    } else {
      console.log("Existing User");
    }}
    if (user.email === 'admin@admin.com') {
      return <Leaderboard user={user} />
    }
    // if (window.location.pathname === "/WelcomePage" || userLevel === 0 || userLevel == undefined ) {
    //   return <TakeOff />
    // }
    // // alert(userLevel);
    // if (window.location.pathname === "/level2" || userLevel === 1 && window.location.pathname === "/") {
    //   return <TestPage user={user} />;
    // }
    // console.log("userlevel",userLevel);
    // if (window.location.pathname === "/level3" || userLevel === 2 && window.location.pathname === "/") {
    //   // window.location.href = "/level3"
    //   return (<div>HELLLO</div>);
    // }
  //  return( window.location.href = "/level"+ (userLevel+1));



   switch(userLevel){
   case -1: return(<Deadend user={user}/>)
   case 0: return <TakeOff />
   case 1:  return <Level2/>
   case 2: return <Level3 user={user}/>
   case 3: return (<TestPage user={user} />);
   case 4: return (<Level5 user={user}/>)
   case 5: return (<Certificate user={user}/>)
   default: return <TakeOff/>;
   }
       // if (window.location.pathname === "/") {
      //   return (window.location.href = '/level' +userLevel);
      // }

    // return (
    //   window.location.href = "/WelcomePage"
    //   // <WelcomePage user={user}/>
    // );
  }
}

export default App;

