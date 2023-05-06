import React, { useState, useEffect } from "react";
import { useFirebase,auth } from "../context/firebase";
import Chart from 'chart.js/auto';
import "../styles/Leaderboard.css"
import { signOut } from "firebase/auth";

const Leaderboard = ({ user }) => {
  const [winners, setwinners] = useState([]);
  const firebase = useFirebase();

  const handleLogout = () => {
    signOut(auth)
  };

  useEffect(() => {

    if (user) {
      firebase.fetchData("/").then(
        data => {
          let temp = [];
          temp = Object.values(data);
          console.log("winners list", temp)
          console.log(temp);
          const dataArray = [];
          for (let i = 2; i < temp.length; i++) {
            dataArray.push(temp[i]);
          }
          console.log(dataArray);
          const temp1 = dataArray.map((_, key) => {
            const temp2 = dataArray[key];
            console.log(temp2);
            return {
              email: temp2['userEmail'],
              timeTaken: temp2['timeTaken']['durationMin'],
              name: temp2['userName'],
              level: temp2['level']
            }
          });
          setwinners(temp1.sort((a, b) => a.timeTaken - b.timeTaken));
        })
    }
  }, [firebase]);



  useEffect(() => {
    // Get the canvas element for the chart
    const chartCanvas = document.getElementById('leaderboard-chart');

    // Create a new Chart instance
    const chart = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: winners.map((user) => user.name),
        datasets: [
          {
            label: 'Score',
            data: winners.map((user) => 100 / user.timeTaken),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Score',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Name',
            },
          },
        },
      },
    });

    // Return a function to destroy the chart when the component unmounts
    return () => {
      chart.destroy();
    };

  }, [winners]);
  useEffect(() => {
    const levelCanvas = document.getElementById('level-chart');

    const levels = {};

    // Count the number of users at each level
    winners.forEach((user) => {
      levels[user.level] = (levels[user.level] || 0) + 1;
    });

    // Create an array of level labels and data
    const levelLabels = Object.keys(levels);
    const levelData = Object.values(levels);

    // Create a new Chart instance for the pie chart
    const levelChart = new Chart(levelCanvas, {
      type: 'pie',
      data: {
        labels: levelLabels,
        datasets: [
          {
            label: 'Number of Users',
            data: levelData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Users by Level',
        },
      },
    });

    // Return a function to destroy the chart when the component unmounts
    return () => {
      levelChart.destroy();
    };
  }, [winners]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Time Taken (minutes)</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {winners.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.timeTaken}</td>
              <td>{user.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
  <div className="chart-container">
    <div className="bar-chart-container">
      <h2 class="chart-title">Score</h2>
      <canvas id="leaderboard-chart"></canvas>
    </div>
    <div className="pie-chart-container">
      <h2 class="chart-title">No. of Users by thier current Level</h2>
      <canvas id="level-chart"></canvas>
    </div>
  </div>
  <div className="admin-links">
            <a href = "#" onClick={handleLogout}>Logout</a>
        </div>
    </div>
  );
};

export default Leaderboard;
