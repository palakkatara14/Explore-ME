import React, { useState } from 'react';
import '../upload.css';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [generatedText, setGeneratedText] = useState(null);
  const [similarImages, setSimilarImages] = useState([]);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSelectedFile(file);
        setIsImageUpload(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReupload = () => {
    setIsImageUpload(false);
    setImagePreview(null);
    setSelectedFile(null);
    setGeneratedText(null);
    setSimilarImages([]);
    setLoading(false); // Reset loading state
  };

  const handleContinue = async () => {
    if (!selectedFile) {
      alert('No file selected');
      return;
    }

    setLoading(true); // Start loading

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1];
      try {
        const response = await fetch('http://localhost:5000/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64String,
            contentType: selectedFile.type,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setGeneratedText(data.generatedText);
          setSimilarImages(data.similarImages); // Set the similar images
          alert('Image uploaded successfully');
        } else {
          alert('Error uploading image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
      } finally {
        setLoading(false); // End loading
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSave = async () => {
    const username = prompt("Enter your username:");
    if (!username) {
      alert("Please enter a username");
      return;
    }

    setLoading(true); // Start loading

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1];
      try {
        const response = await fetch('http://localhost:5000/save-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            image: base64String,
            text: generatedText,
            similarImages,
          }),
        });

        const responseData = await response.json();
        if (response.ok) {
          alert(`Image saved successfully! Response: ${responseData.message}`);
        } else {
          alert(`Error saving image: ${responseData.message}`);
        }
      } catch (error) {
        console.error('Error saving image:', error);
        alert('Error saving image');
      } finally {
        setLoading(false); // End loading
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="upload-component">
      {!isImageUpload && (
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      )}
      {isImageUpload && (
        <div className="image-preview">
          <img src={imagePreview} alt="Selected" width="600" height="400" />
          <button onClick={handleReupload}>Reupload</button>
          <button onClick={handleContinue} disabled={loading}>Continue</button>
          {loading && <p>Loading...</p>} {/* Loading indicator */}
          {generatedText && <p style={{ color: 'white' , fontSize:'16px'}}>Generated Text: {generatedText}</p>}
          <div className="similar-images">
            {similarImages.length > 0 && (
              <div>
                <h2>Generated Image:</h2>
                {similarImages.map((imgUrl, index) => (
                  <img key={index} src={imgUrl} alt="Similar" width="300" style={{ margin: '10px' }} />
                ))}
              </div>
            )}
          </div>
          
          {generatedText && similarImages.length > 0 && (
            <button onClick={handleSave} disabled={loading}>Save</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;
