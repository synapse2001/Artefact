import { useFirebase } from "../context/firebase";
import "../styles/Level3.css"
import { useState } from "react";



const Level3 = ({user}) => {
    const [row1, setRow1] = useState(["",]);
    const [colorcell1, setColorcell1] = useState("bisque")
    const [colorcell2, setColorcell2] = useState("bisque")
    const [colorcell3, setColorcell3] = useState("bisque")
    const [colorcell4, setColorcell4] = useState("bisque")

    const firebase = useFirebase();

    const handleRow1Change = (e, index) => {
        const newValue = (e.target.value);
        setRow1((prevRow1) => {
            const newRow1 = [...prevRow1];
            newRow1[index] = newValue;
            return newRow1;
        });
    };

    const handleCheckRow1 = () => {
        // console.log("here", row1[0]);
        // console.log(row1[0]);

        if (row1[0] == "X" || row1[0] == "x") {
            setColorcell1("green")
        } else { setColorcell1("red") }

        // if (row1[1] == 5 ||row1[1] == 0) {
        //     setColorcell2("green")
        // } else { setColorcell2("red") }

        if (row1[2] == 1||row1[2] == 4) {
            setColorcell3("green")
        } else { setColorcell3("red") }

        if (row1[3] == 5 || row1[3] == 3) {
            setColorcell4("green")
        } else { setColorcell4("red") }



        if ((row1[0] == "X" || row1[0] == "x")  && row1[2] == 1 && row1[3] == 5) {
            if(user){
            firebase.putData('users' + user.uid, { level : 3});
            setTimeout(() => {return(window.location.href = "/level4");},1500
            );}
        }
        if((row1[0] == "X" || row1[0] == "x")  && row1[2] == 4 && row1[3] == 3){
            if(user){
                firebase.putData('users' + user.uid, { level : -1});
                setTimeout(() => {return(window.location.href = "/deadend");},1500
                );}
        }
        // console.log(row1);
    };


    return (
        <div>
            <div className="level3-pretext"><h1>The Numble Game  
                    <br />Make a intelligent guess <br/>
                    There are three input fields<br/>
                    If you are right the input turns green<br/>
                    <p className="level3-instruction">Clue : <br/><br/>
                    I soar through the skies at incredible speeds, <br/>
                    Mach 6 and higher, my velocity exceeds.<br/>
                    The first man on the moon was himself one of my pilot<br/>
                    I am a secret, for now, let's just soar.<br/>
                    </p>         
                    </h1></div>
            <div className="hyper-backdrop"></div>
            {/* <div className=""></div> */}
            <div className="crossword">
                <div className="row">
                    <input
                        type="text"
                        className="cell"
                        style={{ backgroundColor: colorcell1}}
                        // value={row1[0]}
                        onChange={(e) => handleRow1Change(e, 0)}
                        maxLength="1" 
                        pattern="[a-zA-Z0-9]"
                    />
                    <input
                        type="text"
                        className="cell"
                        style={{ backgroundColor: colorcell2 }}
                        value= "-"
                        onChange={(e) => handleRow1Change(e, 1)}
                        disabled
                    />
                    <input
                        type="text"
                        className="cell"
                        style={{ backgroundColor: colorcell3 }}
                        // value={row1[2]}
                        onChange={(e) => handleRow1Change(e, 2)}
                        maxLength="1" 
                        pattern="[a-zA-Z0-9]"
                    />
                    <input
                        type="text"
                        className="cell"
                        style={{ backgroundColor: colorcell4 }}
                        // value={row1[3]}
                        onChange={(e) => handleRow1Change(e, 3)}
                        maxLength="1" 
                        pattern="[a-zA-Z0-9]"
                    />
                    <button className="wordle-check-button" onClick={handleCheckRow1}>✔
                    </button>
                </div>
            </div>
        </div>


    )

}

export default Level3;