import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserProfile } from '../services/api'; // Lambda API call

export default function ProfilePage() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveUserProfile({ age, weight, height, activity });
      alert('Profile saved successfully!');
      navigate('/upload'); // redirect to Upload Meal page
    } catch (err) {
      alert('Error saving profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Profile</h2>
      <form className="card p-6" onSubmit={handleSubmit}>
        <label>Age</label>
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <label>Weight (kg)</label>
        <input
          type="number"
          placeholder="Enter your weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <label>Height (cm)</label>
        <input
          type="number"
          placeholder="Enter your height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />

        <label>Activity Level</label>
        <select value={activity} onChange={(e) => setActivity(e.target.value)} required>
          <option value="">Select activity level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Lightly active</option>
          <option value="moderate">Moderately active</option>
          <option value="active">Active</option>
          <option value="very_active">Very active</option>
        </select>

        <button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
