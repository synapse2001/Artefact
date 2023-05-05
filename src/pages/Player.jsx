import React, { useRef } from "react";

import "../styles/Player.scss"

import {
    BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill,
    BsSkipEndCircleFill, BsFillSkipEndCircleFill
} from 'react-icons/bs'

const Player = ({ podcast,audioElem,isPlaying,setisPlaying,currentPodcast,setcurrentPodcast}) => {

    const seekRef = useRef();

    const playPause = () => {
        setisPlaying(!isPlaying);
    }


    // const setTime = (setTime) =>{
    //     audioElem.current.currentTime = setTime;
    // }
    // function setTime(settime) {
    //     audioElem.current.oncanplay = function(){
    //         audioElem.current.currentTime =settime;
    //     };

    // }
    async function setTime(settime) {
        if (audioElem.current.oncanplay) {
          audioElem.current.currentTime = settime;
        } else {
          setTimeout(() => {
            audioElem.current.currentTime = settime;
          }, 100);
        }
      }
      

    const checkWidth = (e)=>
    {
      let width = seekRef.current.clientWidth;
      const offset = e.nativeEvent.offsetX;
  
      const divprogress = offset / width * 100;
      console.log(divprogress);
        // console.log(currentPodcast.length);
        // console.log(audioElem.current.currentTime);
        let settime = (divprogress / 100 )* currentPodcast.length
        console.log(settime);
        console.log(audioElem.current.currentTime);
        // audioElem.current.oncanplay = function(){
        //     console.log("i am in");
        //     audioElem.current.currentTime =settime;
        // };
        setTime(settime);
        console.log(audioElem.current.currentTime);
    }

    // const skipBack = () =>{
    //     let index = podcast.findIndex(x =>x.title === currentPodcast.title)
    //     if(index === 0){
    //         setcurrentPodcast(podcast[podcast.length-1])
    //     }
    //     else{
    //         setcurrentPodcast(podcast[index -1])
    //     }
    //     setTime(0);
    //     // setisPlaying(!isPlaying);
    //     // setisPlaying(!isPlaying);
    //     // audioElem.current.currentTime = 0;
    // }

    // const skipNext = ()=>
    // {
    //   const index = podcast.findIndex(x=>x.title === currentPodcast.title);
  
    //   if (index === podcast.length-1)
    //   {
    //     setcurrentPodcast(podcast[0])
    //   }
    //   else
    //   {
    //     setcurrentPodcast(podcast[index + 1])
    //   }
    //   setTime(0);
    // //   alert("I am skipped")
    // //   console.log(isPlaying);
    // //   console.log("after",isPlaying);

    // //   audioElem.current.currentTime = 0;     
    // }

    return (
        <body className="player-body">
        <div className="player_container">
            <div className="player-title">
                <p><h1>Into the Unknown</h1></p>
            </div>
            <div className="player-navigation">
                <div className="player-navigation-wrapper" onClick={checkWidth} ref = {seekRef}>
                    <div className="seek_bar" style={{width: `${currentPodcast.progress+"%"}`}}></div>
                </div>

            </div>
            <div className="player-controls">
                {isPlaying ? <BsFillPauseCircleFill 
                className="player-btn_action pp" onClick={playPause} />
                :<BsFillPlayCircleFill 
                className="player-btn_action pp" onClick={playPause} />}
            </div>
        </div>
        </body>

    )
}

export default Player;