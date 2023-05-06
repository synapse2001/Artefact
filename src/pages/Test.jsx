import React, { useState, useEffect } from "react";
import "../styles/Test.css"
import { auth, useFirebase } from "../context/firebase";
import { signOut } from "firebase/auth";
import HomePage from "./HomePage";
import { equalTo } from "firebase/database";
// import "./Test.js"

let savedTheme = localStorage.getItem('savedTheme');
const changeTheme = (color) => {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');

    document.body.className = color;
    // Change blinking cursor for darker theme:
    color === 'darker' ?
        document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');

    document.querySelector('input').className = `${color}-input`;
    // Change todo color without changing their status (completed or not):
    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ?
            todo.className = `todo ${color}-todo completed`
            : todo.className = `todo ${color}-todo`;
    });
    // Change buttons color according to their type (todo, check or delete):
    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
                button.className = `check-btn ${color}-button`;
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`;
            } else if (item === 'todo-btn') {
                button.className = `todo-btn ${color}-button`;
            }
        });
    });
}


function savelocal(todo) {
    //Check: if item/s are there;
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const addToDo = (task) => {


    // Prevents form from submitting / Prevents form from relaoding;
    // event.preventDefault();
    const toDoInput = document.querySelector('.todo-input');
    const toDoList = document.querySelector('.todo-list');
    // toDo DIV;
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    // Create LI
    const newToDo = document.createElement('li');
    if (task === '') {
        alert("You must write something!");
    }
    else {
        // alert("HIIIIIOIdggjd")
        // newToDo.innerText = "hey";
        newToDo.innerText = task;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // Adding to local storage;
        savelocal(task);

        // check btn;
        // const checked = document.createElement('button');
        // checked.innerHTML = '<i class="fas fa-check"></i>';
        // checked.classList.add('check-btn', `${savedTheme}-button`);
        // toDoDiv.appendChild(checked);
        // delete btn;
        // const deleted = document.createElement('button');
        // deleted.innerHTML = '<i class="fas fa-trash"></i>';
        // deleted.classList.add('delete-btn', `${savedTheme}-button`);
        // toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);

        // CLearing the input;
        task = '';
    }

}




const TestPage = ({ user }) => {
    const [l4answer, setl4answer] = useState("")

    const checkAnswer = (task) => {

        // addToDo(task)
        // alert(l4answer);
        if (task.toUpperCase() === l4answer) {
            // alert("Congrats");
            addToDo("You are Killing it. Aren't You! ")
            addToDo("Taking you the Next Expedition")
            firebase.putData('users' + user.uid, { level: 4 });
            setTimeout(() => { return (window.location.href = "/level5"); }, 3000
            );

        } else {
            // if(task.equalsIgnoreCase()) 
            addToDo("Try Again")
        }
    }

    const [task, setTask] = useState("");
    const firebase = useFirebase();
    useEffect(() => {
        firebase.fetchData("answers").then(
            data => {
                const level4answer = data.level4;
                setl4answer(level4answer);
            }
        )
        changeTheme("standard");
    }, [firebase]);


    return (
        <html className="level4">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#062e3f" />
                <meta name="Description" content="A dynamic and aesthetic To-Do List WebApp." />

                {/* Google Font: Quick Sand */}
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap" rel="stylesheet" />

                {/* font awesome (https://fontawesome.com) for basic icons; source: https://cdnjs.com/libraries/font-awesome */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" integrity="sha256-46r060N2LrChLLb5zowXQ72/iKKNiw/lAmygmHExk/o=" crossorigin="anonymous" />

                <link rel="shortcut icon" type="image/png" href="assets/favicon.png" />
                {/* <link rel="stylesheet" href="/styles/Test.css" /> */}
                {/* <title>What </title> */}
            </head>
            <body className="testing">
                <div id="header">
                    <div class="flexrow-container">
                        <div onClick={() => changeTheme('standard')} class="standard-theme theme-selector"></div>
                        <div onClick={() => changeTheme('light')} class="light-theme theme-selector"></div>
                        <div onClick={() => changeTheme('darker')} class="darker-theme theme-selector"></div>
                    </div>
                    <h1 id="title">The Lost Artefact.<div id="border"></div></h1>
                </div>

                <div className="taskinput" id="form">

                    <input onChange={e => setTask(e.target.value)} class="todo-input" value={task} type="text" placeholder="Listen to the Audio  Clue and Answer."></input>
                    <button onClick={() => checkAnswer(task)} class="todo-btn">I Got This!</button>
                    {/* <button onClick={() => {signOut(auth); window.location.href = "/"}}>Logout</button> */}

                </div>
                <div>
                    {/* <p><span id="datetime"></span></p> */}
                    {/* <script src="JS/time.js"></script> */}
                </div>

                <div id="myUnOrdList">
                    <ul class="todo-list">
                        {/* <!-- (Basic Format)
                    <div class="todo">
                        items added to this list:
                        <li></li>
                        <button>delete</button>
                        <button>check</button>
                    </div> --> */}
                    </ul>
                </div>
                {/* <div>
                <button onClick={() => signOut(auth)}></button>
            </div> */}
                <div className="playercss">
                    <HomePage
                        user={user}
                    // podcastData={podcastData}
                    />
                </div>
                {/* <script src="/Test.js" type="text/javascript"> </script> */}
            </body>
        </html>
    );
};

export default TestPage;