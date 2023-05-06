import { useEffect, useRef, useState } from "react";
// import { podcastData } from "../assets/audio";
import Player from "./Player";
import { signOut } from "firebase/auth";
import { auth } from "../context/firebase";
import { useFirebase } from "../context/firebase";
import { useAuth } from "../controllers/userState";
import { get } from "firebase/database";
import audio from '../assets/audio.mp3';


const HomePage = ({user,podcastData}) =>{

    // const {user} = props;

    const[podcast,setPodcast] = useState(podcastData);
    const[isPlaying, setisPlaying] = useState(false);
    const[currentPodcast, setcurrentPodcast] = useState("");
    const audioElem = useRef();
    const firebase = useFirebase();
    const userId = user.uid;
    console.log(userId);
    
    useEffect(() => {
      firebase.fetchData("users"+ userId)
      .then(data => {
        const resume = data.timestamp['ct'];
        // console.log("resume",resume);
        audioElem.current.currentTime = resume;
        // console.log("hellll no",data);
        // console.log(data.timestamp['ct']); // logs the data returned by fetchData
      })
      .catch(error => {
        console.log(error); // logs any errors that occur
      });
    }, [0]);
    
    useEffect(() => {
      if (isPlaying) {
        audioElem.current.play();
      } else {
        audioElem.current.pause();
      }
    }, [isPlaying]);

    useEffect(() => {
    }, [isPlaying]);



    const onPlaying = async () =>{
        const userId = user.uid;
        const duration = audioElem.current.duration;
        const ct = audioElem.current.currentTime;
        firebase.putData('users'+userId,{duration:{duration},timestamp:{ct}})
        console.log(duration,ct);
        setcurrentPodcast({  ...currentPodcast, "progress": (ct / duration)* 100, "length": duration})
    }
    return(
        <div className="homepage">
            <audio src = {audio}
            ref = {audioElem}
            onTimeUpdate={onPlaying}
            />
            <Player 
            podcast ={podcast} 
            setPodcast = {setPodcast} 
            isPlaying = {isPlaying} 
            setisPlaying = {setisPlaying} 
            audioElem ={audioElem} 
            currentPodcast={currentPodcast}
            setcurrentPodcast ={setcurrentPodcast}
            /> 
        </div>
    )

}

export default HomePage;