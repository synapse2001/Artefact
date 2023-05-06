import "../styles/Level5.css"
import level5img from "../assets/b2.jpg"
import riddleimg from "../assets/riddle.png"
import { useFirebase } from "../context/firebase";
import { useState,useEffect } from "react";


const Level5 = ({user}) => {
    const [l5answer, setl5answer] = useState("")
    const [answer,setAnswer] = useState("");



    const firebase = useFirebase();

    useEffect(() => {
        firebase.fetchData("answers").then(
            data => {
                const level5answer = data.level5;
                // console.log(level5answer);
                setl5answer(level5answer);
                // console.log(l5answer);
            }
        )
    }, [firebase]);


    const checkAnswer = () => {

        // addToDo(task)
        // alert(l5answer);
        if (answer.toUpperCase() === l5answer) {
            alert("Congratulation You are Now a Certified Aviation Geek !");
            const now = new Date();
            if(user){
            firebase.putData('users' + user.uid, { level : 5,endTime:{now}});
            setTimeout(() => {return(window.location.href = "/level6");},2000
            );}

        } else {
            alert("Try Again! Answer the Full Key");
            // if(task.equalsIgnoreCase()) 
            // addToDo("Try Again") 
        }
    }

return(

    <div>
    <h1 className="level5text">Congratuation ! <br/>
    You made it this Far<br/> 
    To the Final Showdown<br/>
    A Riddle away from being a Wing Master<br/>
    </h1>
    <div className="level5-riddle-container">

    <img className="level5-riddle" src ={riddleimg}>
    </img>
    </div>
    <div>
        <img src={level5img} alt="not found" className="level5-img"/>
        {/* <button onClick={handleThrottleClick} className="throttle">Throttle up</button> */}
    </div>
    <div className="level5-button-container">
        <input onChange={e => setAnswer(e.target.value)} className="level5-input" type = "text"placeholder="Say my Name !"></input>
        <button onClick={checkAnswer}className="level5-button">Submit</button>
    </div>
</div>
)



}

export default Level5;