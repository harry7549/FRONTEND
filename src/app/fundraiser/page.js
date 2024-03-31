"use client";
// "side fetching (suitable for most cases)
import React, { useState, useEffect } from "react";
import "./globals.css";
import withauth from "@/utils/withauth";

const CircularProgressBar = ({ total, raised }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      const id = Math.random() * 60;
      const idi = Math.ceil(id);

      try {
        const response = await fetch(
          `https://66085aefa2a5dd477b1460e8.mockapi.io/fapi/ngo/percentage/${idi}`
        );
        const data = await response.json();
        // console.log(data.total);
        setProgress(data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const circleStyle = {
    strokeDasharray: `${progress}, 100`,
    strokeDashoffset: `${100 - progress}`,
  };

  return (
    <div className="circular">
      (
      <>
        <svg viewBox="0 0 100 100">
          <circle className="inner" cx="50" cy="50" r="40" />
          <circle className="bar" cx="50" cy="50" r="40" style={circleStyle} />
        </svg>
        <div className="numb">{progress}%</div>
      </>
      )
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="container">
      <CircularProgressBar />
    </div>
  );
};

export default withauth(HomePage);
