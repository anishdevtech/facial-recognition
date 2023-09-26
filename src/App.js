import React, { useRef, useEffect } from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

function App() {
  // Create references for webcam and canvas elements
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Function to run FaceMesh
  const runFacemesh = async () => {
    // Load FaceMesh model
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    
    // Set interval to detect facial landmarks
    setInterval(() => {
      detect(net);
    }, 100);
  };

  // Function to detect facial landmarks
  const detect = async (net) => {
    // Check if webcam is ready
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces({ input: video });
      console.log(face);

      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  };

  // Run FaceMesh on component mount
  useEffect(() => {
    runFacemesh();
  }, []);

  // Render the app
  return (
    <div className="App">
      <header className="App-header">
        {/* Webcam component */}
        <Webcam ref={webcamRef} style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: "100%", // Adjust width as needed
          height: "auto" // Adjust height as needed
        }} />
        {/* Canvas for drawing facial landmarks */}
        <canvas ref={canvasRef} style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: "100%", // Adjust width as needed
          height: "auto" // Adjust height as needed
        }} />
      </header>
    </div>
  );
}

export default App;
