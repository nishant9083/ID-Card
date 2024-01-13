import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData);

      // Send the file to the server using Axios
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div
      style={{
        padding: '3rem',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#eaf8ff',
        borderRadius: '2rem',
        margin: '3rem 0',
        border: '2px dotted #395fac',
      }}
    >
      <input type="file" accept={'.csv'} onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
