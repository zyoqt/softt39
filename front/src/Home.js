import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";

const Home = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const handleLogout = () => {
    alert("You have been logged out!");
    navigate("/");
  };

  const toggleCamera = () => {
    setIsCameraOpen(!isCameraOpen);
    setCapturedImage(null); // Clear previous image
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const classifyImage = async () => {
    if (!capturedImage) {
      alert("Capture an image first!");
      return;
    }

    // Convert base64 to file blob
    const base64Data = capturedImage.replace(/^data:image\/jpeg;base64,/, "");
    const imageBlob = new Blob([Buffer.from(base64Data, "base64")], {
      type: "image/jpeg",
    });

    const formData = new FormData();
    formData.append("image", imageBlob, "image.jpg");

    try {
      const response = await axios.post("http://127.0.0.1:5000/classify", formData);
      setClassificationResult(response.data.label);
    } catch (error) {
      console.error("Error classifying image:", error);
      alert("Failed to classify the image.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Homepage</h1>
      <div style={styles.buttons}>
        <button style={styles.button} onClick={handleLogout}>
          Log Out
        </button>
        <button style={styles.button} onClick={toggleCamera}>
          {isCameraOpen ? "Close Camera" : "Open Camera"}
        </button>
      </div>
      {isCameraOpen && (
        <div style={styles.cameraContainer}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={styles.webcam}
          />
          <button style={styles.button} onClick={captureImage}>
            Capture Image
          </button>
        </div>
      )}
      {capturedImage && (
        <div style={styles.capturedContainer}>
          <h3 style={styles.subtitle}>Captured Image:</h3>
          <img
            src={capturedImage}
            alt="Captured"
            style={styles.capturedImage}
          />
          <button style={styles.button} onClick={classifyImage}>
            Classify
          </button>
        </div>
      )}
      {classificationResult && (
        <div style={styles.resultContainer}>
          <h3 style={styles.subtitle}>Classification Result:</h3>
          <p>{classificationResult}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#007bff",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  cameraContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  webcam: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px",
    border: "2px solid #007bff",
    marginBottom: "10px",
  },
  capturedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    textAlign: "center",
  },
  capturedImage: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "10px",
    border: "2px solid #007bff",
    marginTop: "10px",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
};

export default Home;
