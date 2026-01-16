import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");

  const [profileImage, setProfileImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result); // base64 image
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const profileData = {
      email: user?.email,
      age,
      weight,
      height,
      activity,
      goal,
      profileImage,
    };

    try {
      const response = await fetch(
        "https://x7gf886npj.execute-api.us-east-1.amazonaws.com/save-profile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to save profile");
      }

      // Save image locally for dashboard
      if (profileImage) {
        localStorage.setItem("profileImage", profileImage);
      }
      if (user?.email) {
  localStorage.setItem("email", user.email);
}

      setMessage("Profile saved successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const username = user?.email?.split("@")[0] || "User";

  return (
    <div className="container mx-auto max-w-md mt-20 bg-white dark:bg-gray-900 p-8 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        Welcome {username}!
      </h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-500 shadow">
          <img
            src={
              profileImage ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <label className="mt-3 cursor-pointer text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Age</label>
          <input
            type="number"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label>Weight (kg)</label>
          <input
            type="number"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label>Height (cm)</label>
          <input
            type="number"
            required
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label>Activity Level</label>
          <select
            required
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full p-3 border rounded"
          >
            <option value="">Select</option>
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
        </div>

        <div>
          <label>Goal</label>
          <select
            required
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 border rounded"
          >
            <option value="">Select your goal</option>
            <option value="lose_weight">Lose Weight</option>
            <option value="maintain_weight">Maintain Weight</option>
            <option value="gain_weight">Gain Weight</option>
            <option value="build_muscle">Build Muscle</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>

        {message && <p className="text-green-600 text-center mt-3">{message}</p>}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </form>
    </div>
  );
}
