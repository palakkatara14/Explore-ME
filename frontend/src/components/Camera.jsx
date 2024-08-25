


import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../camera.css';

const Camera = () => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [generatedText, setGeneratedText] = useState(null);
  const [similarImages, setSimilarImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const showCamera = () => {
    setIsCameraVisible(true);
    setIsImageCaptured(false);
    requestCameraPermission();
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        alert('Camera permission denied. Please allow access to use the camera feature.');
        setIsCameraVisible(false);
      } else {
        console.error('Error accessing camera:', error);
      }
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current.srcObject) {
      alert('Please allow camera permission to capture an image.');
      return;
    }
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL('image/png');
    setCapturedImage(imageData);
    setIsImageCaptured(true);
    
  };

  const handleRecapture = () => {
    setIsImageCaptured(false);
    showCamera();
  };

  const handleContinue = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:5000/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: capturedImage.split(',')[1],
          contentType: 'image/png',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedText(data.generatedText);
        setSimilarImages(data.similarImages);
        alert('Image uploaded successfully');
      } else {
        alert('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSave = async () => {
    const username = prompt("Enter your username:");
    if (!username) {
      alert("Please enter a username");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/save-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          image: capturedImage.split(',')[1],
          text: generatedText,
          similarImages,
        }),
      });

      if (response.ok) {
        alert('Image saved successfully');
      } else {
        alert('Error saving image');
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  return (
    <div className="camera-component">
      <Link to="/"><button>Home</button></Link>
      {!isCameraVisible && !isImageCaptured && <button onClick={showCamera}>Show Camera</button>}
      {isCameraVisible && !isImageCaptured && (
        <div className="camera-view">
          <video ref={videoRef} className="video-feed" width="600" height="400"></video>
          <button onClick={capturePhoto}>Capture</button>
          <canvas ref={canvasRef} className="photo-canvas" width="600" height="400"></canvas>
        </div>
      )}
      {isImageCaptured && (
        <div className="image-preview">
          <img src={capturedImage} alt="Captured" width="600" height="400" />
          <button onClick={handleRecapture}>Recapture</button>
          {!isLoading ? (
            <button onClick={handleContinue}>Continue</button>
          ) : (
            <button disabled>Loading...</button>
          )}
         {generatedText && <p style={{ color: 'white' , fontSize:'24px'}}>Generated Text: {generatedText}</p>}
          {similarImages.length > 0 && (
            <div className="similar-images">
              <h3>Generated images:</h3>
              <div className="image-list">
                {similarImages.map((image, index) => (
                  <img key={index} src={image} alt={` ${index}`} width="200" height="150" />
                ))}
              </div>
            </div>
          )}
          {generatedText && similarImages.length > 0 && (
            <button onClick={handleSave}>Save</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Camera;


