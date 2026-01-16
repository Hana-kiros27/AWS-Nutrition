import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UploadPage() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detectedFoods, setDetectedFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // =======================
  // Handle file selection
  // =======================
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setDetectedFoods([]);
    setError("");
  };

  // =======================
  // Handle form submission
  // =======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an image!");
      return;
    }
    if (!user?.email) {
      setError("User not logged in!");
      return;
    }

    setLoading(true);
    setError("");
    setDetectedFoods([]);

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;

        // Call Lambda API
        const res = await fetch(
          "https://ltlorsswbb.execute-api.us-east-1.amazonaws.com/upload-meal", // replace with your API Gateway
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              mealImageBase64: base64Image,
            }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");

        // Update UI
        setDetectedFoods(data.detectedFoods || []);
        setPreview(data.imageUrl || preview);
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        Upload Your Meal
      </h2>

      <form
        className="bg-green-50 p-6 rounded-xl shadow-lg flex flex-col items-center border border-green-200"
        onSubmit={handleSubmit}
      >
        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full text-green-700 border border-green-300 rounded px-3 py-2 cursor-pointer hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        {/* Image preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className={`mb-4 w-64 h-64 object-cover rounded-lg shadow-md border border-green-200 ${
              loading ? "opacity-50 animate-pulse" : ""
            }`}
          />
        )}

        {/* Detected foods */}
        {detectedFoods.length > 0 && (
          <div className="bg-green-100 p-4 rounded-lg w-full mb-4">
            <h3 className="font-semibold text-green-700 mb-2">Detected Foods:</h3>
            <ul className="list-disc list-inside text-green-800">
              {detectedFoods.map((food, idx) => (
                <li key={idx}>{food}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Upload & Analyze"
          )}
        </button>
      </form>
    </div>
  );
}
