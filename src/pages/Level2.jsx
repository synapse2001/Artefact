import React, { useEffect, useState } from "react";
import crashpic from '../assets/crash.png';
import "../styles/Level2.css"
import { useAuth } from "../controllers/userState";
import { useFirebase } from "../context/firebase";



function Level2() {
    const [showVideo, setShowVideo] = useState(true);
    const [sliderValue, setSliderValue] = useState(0);
    const [landingOption, setLandingOption] = useState('teterboro');

    const [apu, setApu] = useState('on');
    const { user } = useAuth();
    const firebase = useFirebase();


    const handleVideoend = () => {
        setShowVideo(false);
    }
    function handleSliderChange(event) {
        setSliderValue(event.target.value);
    }
    const handleApuChange = (event) => {
        setApu(event.target.value);
    }
    const handleOptionChange = (e) => {
        setLandingOption(e.target.value);
    };
    const handleLanding = (e) => {
        if(sliderValue == 2 && landingOption == "hudson" && apu == 'on'){
            firebase.putData('users' + user.uid, { level : 2});
            setTimeout(() => {return(window.location.href = "/level3");},1500
            );
        }else{
            firebase.putData('users' + user.uid, { level : -1});
            setTimeout(() => {return(window.location.href = "/deadend");},1500
            );
        }
    };
    

    return (
        <div className="crash">
            {!showVideo && (
                <div>
                    <div className="crash-pre-text"><h1>You have to make a Emergency Descent 
                    <br />And every second counts<br/>
                    <p className="level2-instruction">Instruction : <br/>
                        A eye for detail <br/>
                         You need to find clues to land safely<br/>
                         Go Go Go ! Clocks Ticking< br/>
                        <a href ="https://www.youtube.com/watch?v=qHQmkJjwNqs" target="_blank">Click Me</a>
                    </p>         
                    </h1></div>
                    <div>
                        <img src={crashpic} alt="not found" className="crashpic" />
                    </div>
                    <div className="crash-container">
                        <div className="crash-slider-container">
                            <label htmlFor="crash-slider">Set the Flaps level:</label>
                            <input
                                type="range"
                                min="0"
                                max="3"
                                value={sliderValue}
                                className="crash-slider"
                                id="crash-slider"
                                onChange={handleSliderChange}
                            />
                            <p className="crash-slider-value">{sliderValue}</p>
                        </div>
                        <div className="crash-radiobutton-container">
                            <p>Auxiliary power Unit</p>
                            <label htmlFor="crash-apu-on">On</label>
                            <input type="radio" id="crash-apu-on" name="crash-apu" value="on" className="crash-radio"
                                checked={apu === 'on'} onChange={handleApuChange} />
                            <label htmlFor="crash-apu-off">Off</label>
                            <input type="radio" id="crash-apu-off" name="crash-apu" value="off" className="crash-radio"
                                checked={apu === 'off'} onChange={handleApuChange} />
                        </div>
                        <label htmlFor="crash-optionmenu">Choose where you want to land:</label>
                        <select
                            id="crash-optionmenu"
                            name="crash-optionmenu"
                            className="crash-optionmenu"
                            value={landingOption}
                            onChange={handleOptionChange}
                        >
                            <option value="teterboro">Teterboro Airport</option>
                            <option value="hudson">Hudson River</option>
                        </select>
                        <button class="crash-land" onClick={handleLanding}>Submit</button>
                    </div>
                </div>
            )}

            {showVideo && (
                <div className="crash-video-container">
                    <video id="crashvideo" className="crash-video" controls autoPlay onEnded={handleVideoend}>
                        <source src="assets/videos/crash.mp4" type="video/mp4" />
                    </video>
                </div>
            )}
        </div>
    );
}

export default Level2;
