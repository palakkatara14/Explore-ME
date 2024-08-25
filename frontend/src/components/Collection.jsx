


import React, { useState } from 'react';
import axios from 'axios';
import '../collection.css';

const Collection = () => {
  const [username, setUsername] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [noImagesMessage, setNoImagesMessage] = useState('');

  const handleFetchCollection = async () => {
    try {
      const response = await axios.get('http://localhost:5000/collection', {
        params: { username: username },
      });

      if (response.data.length === 0) {
        setImages([]); // Clear images state
        setNoImagesMessage('You don\'t have any saved image.');
      } else {
        setImages(response.data);
        setNoImagesMessage('');
      }
      setError('');
    } catch (err) {
      setError('Error retrieving collection');
      setImages([]);
      setNoImagesMessage('');
    }
  };

  return (
    <div className="collection-component">
      <h1>Image Collection</h1>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleFetchCollection}>Search</button>
      {error && <p>{error}</p>}
      {noImagesMessage && <p>{noImagesMessage}</p>}
      <div className="image-grid">
        {images.length > 0 && !noImagesMessage ? (
          images.map((image) => (
            <div key={image._id} className="image-item">
              <img src={`data:${image.contentType};base64,${image.image}`} alt={image.text} />
              <p>{image.text}</p>
              <div className="similar-images">
                {image.similarImages.map((imgUrl, idx) => (
                  <img key={idx} src={imgUrl} alt="Similar" width="100" />
                ))}
              </div>
            </div>
          ))
        ) : (
          !noImagesMessage 
        )}
      </div>
    </div>
  );
};

export default Collection;