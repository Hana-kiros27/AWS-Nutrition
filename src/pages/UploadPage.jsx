import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadMealImage } from '../services/api';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select an image!');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('mealImage', selectedFile);

      // Call API Gateway → Lambda → S3 + Bedrock
      await uploadMealImage(formData);

      alert('Meal uploaded and processed successfully!');
      navigate('/dashboard'); // redirect to Dashboard
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center">Upload Your Meal</h2>
      <form className="card p-6 flex flex-col items-center" onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="mb-4"
        />
        {preview && (
          <img 
            src={preview} 
            alt="Preview" 
            className="mb-4 w-64 h-64 object-cover rounded-lg shadow-md"
          />
        )}
        <button 
          type="submit" 
          className="w-full mt-2"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Upload & Analyze'}
        </button>
      </form>
    </div>
  );
}
