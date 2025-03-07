import { useState } from 'react';
import axios from 'axios';

function PestDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.message); // Assuming backend sends JSON like {message: "Pest detected!"}
    } catch (error) {
      console.error('Upload failed', error);
      setResult('Failed to analyze image.');
    }
  };

  return (
    <div>
      <h2>Pest Detection</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Analyze</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default PestDetection;
