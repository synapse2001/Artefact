import './App.css';
import React, { useEffect, useState } from "react";
import SignUpPage from "./pages/SignUp";
import TestPage from "./pages/Test"
import SignInPage from "./pages/SignIn";
import LoadingPage from "./pages/LoadingPage";
import { useFirebase } from './context/firebase';
import { useAuth } from './controllers/userState';
import TakeOff from './pages/TakeoffPage';
import Level3 from './pages/Level3';
import Level2 from './pages/Level2';
import Level5 from './pages/Level5';
import Certificate from './pages/Certificate';
import Deadend from './pages/Deadend';
import Leaderboard from './pages/Welcome';
import ScoreCard from './pages/Scoreboard';



function App() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userLevel, setUserLevel] = useState(0);
  const [uid, setUid] = useState("");
  const firebase = useFirebase();
  let resume;
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
    if (user) {
      const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
      const userEmail = user.email;
      const userId = user.uid;
      const userName = user.displayName;

      if (isNewUser) {
        firebase.putData('users' + userId, { userEmail });
        firebase.putData('users' + userId, { timeTaken: { durationMin: 0 } });
        firebase.putData('users' + userId, { userName });
        if (userName == null) { 
          const temp = userEmail.split('@')[0];
          firebase.putData('users' + userId, { userName: temp }); 
        }
      } else {
        console.log("Existing User");
      }
    }
    if (user.email === 'admin@admin.com') {
      return <Leaderboard user={user} />
    }
    if(window.location.pathname === "/ScoreCard"){
      return(<ScoreCard user={user}/>)
    }

    switch (userLevel) {
      case -1: return (<Deadend user={user} />)
      case 0: return <TakeOff />
      case 1: return <Level2 />
      case 2: return <Level3 user={user} />
      case 3: return (<TestPage user={user} />);
      case 4: return (<Level5 user={user} />)
      case 5: return (<Certificate user={user} />)
      default: return <TakeOff />;
    }
  }
}

export default App;

