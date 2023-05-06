import React, { useState } from "react";
import takeoff from '../assets/takeoff.png';
import "../styles/Takeoff.css"
import { useAuth } from "../controllers/userState";
import { useFirebase } from "../context/firebase";



function TakeOff() {
  const [showVideo, setShowVideo] = useState(false);
  const [onboard, setOnboard] = useState(false);
  const { user } = useAuth();
  const firebase = useFirebase();
  if(user){
  // console.log(user.uid);
  const userId = user.uid;
  }
  const handleOnboard = () =>{
    setOnboard(true);
    // console.log(onboard);
    // alert("Navigating to signin page");
    return(window.location.href = "/level2");
  }
  const handleThrottleClick = () => {
    setShowVideo(true);    
    if(user){
      const now = new Date();
      // console.log(user.uid);
      const userId = user.uid;
      firebase.putData('users' + userId, { level : 1, startTime: {now}});
    }
  };

  return (
    <div className="takeoff">
      {!showVideo && (
        <div>
            <div className="takeoff-pre-text">
              <h1>Welcome to Aviation 1O1 <br/>
              You are Pilot in Command <br/>
              <p className="takeoff-instruction">Instruction : <br/>
               You are a US Airways 1549 Pilot <br/>
               and The ATC clears for take-off
              </p>
              </h1>
      
            </div>
            <div>
                <img src={takeoff} alt="not found" className="cockpit"/>
                <button onClick={handleThrottleClick} className="throttle">Throttle up</button>
            </div>
        </div>
      )}

      {showVideo && (
        <div className="takeoff-video-container">
          <a className="takeoff-pre-text" onClick={handleThrottleClick} ><h1>Setting Up Things <br/>While You Enjoy your Flight </h1></a>
            <video className="video" controls autoPlay onEnded={handleOnboard}>
                <source src="assets/videos/takeoff.mp4" type="video/mp4" />
            </video>
        </div>
      )}
    </div>
  );
}

export default TakeOff;
