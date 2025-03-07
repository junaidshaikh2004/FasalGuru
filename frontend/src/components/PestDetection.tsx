import { useState, useRef } from 'react';
import axios from 'axios';

function PestDetection() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState('');
    const [showCamera, setShowCamera] = useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCapture = async () => {
        setShowCamera(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (error) {
            console.error('Error accessing camera', error);
            alert('Could not access camera');
        }
    };

    const captureImage = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            const file = new File([blob], 'captured_image.png', { type: 'image/png' });
            setSelectedFile(file);
            setShowCamera(false);
        }, 'image/png');

        const stream = video.srcObject;
        stream?.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select or capture an image first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://127.0.0.1:8000/analyze_image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const { predicted_disease, prevention_measures } = response.data;
            setResult(`Detected: ${predicted_disease}\nPrevention: ${prevention_measures}`);
        } catch (error) {
            console.error('Upload failed', error);
            setResult('Failed to analyze image.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Pest Detection</h2>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            <div style={{ margin: '10px 0' }}>
                <button onClick={handleCapture}>Open Camera & Capture Image</button>
            </div>

            {showCamera && (
                <div>
                    <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '400px' }}></video>
                    <button onClick={captureImage}>Capture Image</button>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            <div style={{ marginTop: '10px' }}>
                <button onClick={handleUpload}>Upload and Analyze</button>
            </div>

            {result && (
                <div style={{ marginTop: '20px', whiteSpace: 'pre-line', fontWeight: 'bold' }}>
                    {result}
                </div>
            )}
        </div>
    );
}

export default PestDetection;