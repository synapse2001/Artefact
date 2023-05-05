import React, { useState, useEffect } from 'react';
import '../styles/LoadingPage.css'; // Import the CSS file with unique class names

function LoadingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // Replace with your loading time
  }, []);

  return (
    <div className="loading-container">
      {!isLoaded && (
        <div className="loading-spinner"></div>
      )}
      {isLoaded && <div className="page-content">Your page content goes here</div>}
    </div>
  );
}

export default LoadingPage;


