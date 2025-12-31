import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getLatestMeal } from "../services/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const navigate = useNavigate();
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const data = await getLatestMeal();
        setMealData(data);
      } catch (err) {
        console.error("Error fetching meal:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMeal();
  }, []);

  // Placeholder if no meal exists
  const imageUrl = mealData?.imageUrl || "https://via.placeholder.com/400x300?text=No+Meal+Uploaded";
  const detectedFoods = mealData?.detectedFoods || ["No foods detected"];
  const calories = mealData?.calories || 0;
  const protein = mealData?.protein || 0;
  const carbs = mealData?.carbs || 0;
  const fat = mealData?.fat || 0;
  const recommendations = mealData?.recommendations || ["No recommendations yet"];
  const tips = mealData?.tips || ["No tips yet"];

  const chartData = {
    labels: ["Calories", "Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [calories, protein, carbs, fat],
        backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#fbbf24"],
      },
    ],
  };

  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* ================= LEFT SIDEBAR ================= */}
    <aside className="w-full md:w-1/4 bg-green-100 shadow-lg p-6 flex flex-col items-center md:items-stretch">
  {/* Profile Photo */}
  <div className="flex flex-col items-center mb-8">
    <img
      src="../src/pages/placeholder.jpg" // or your circle placeholder
      alt="Profile"
      className="w-28 h-28 rounded-full mb-3 object-cover"
    />
    <button
      onClick={() => alert("Upload photo functionality coming soon!")}
      className="text-sm text-green-700 hover:underline"
    >
      Upload Photo
    </button>
  </div>

  {/* Sidebar Navigation */}
  <nav className="flex flex-col space-y-3">
    <button
      onClick={() => navigate("/dashboard")}
      className="w-full text-left px-4 py-2 rounded hover:bg-green-200"
    >
      📊 Dashboard
    </button>
    <button
      onClick={() => navigate("/meal-tracker")}
      className="w-full text-left px-4 py-2 rounded hover:bg-green-200"
    >
      🍽 Meal Tracker
    </button>
    <button
      onClick={() => navigate("/meal-plans")}
      className="w-full text-left px-4 py-2 rounded hover:bg-green-200"
    >
      📋 Meal Plans
    </button>
    <button
      onClick={() => navigate("/upload")}
      className="w-full text-left px-4 py-2 rounded hover:bg-green-200"
    >
      📷 Upload Meal
    </button>
    <button
      onClick={() => navigate("/settings")}
      className="w-full text-left px-4 py-2 rounded hover:bg-green-200"
    >
      ⚙ Settings
    </button>
  </nav>
</aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left text-green-600">
  Nutrition Dashboard
</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Meal Image */}
          <div className="bg-white p-5 rounded shadow flex flex-col items-center">
            <h3 className="font-semibold mb-3 text-green-600">Your Meal</h3>
            <img src="../src/pages/mealplaceholder.png" alt="Meal" className="rounded-lg w-full object-cover" />
          </div>

          {/* Nutrition Info */}
          <div className="bg-white p-5 rounded shadow">
            <h3 className="font-semibold mb-3 text-green-600">Nutrition Summary</h3>
            <ul className="space-y-1">
              {detectedFoods.map((food, i) => (
                <li key={i}>• {food}</li>
              ))}
              <li>Calories: {calories} kcal</li>
              <li>Protein: {protein} g</li>
              <li>Carbs: {carbs} g</li>
              <li>Fat: {fat} g</li>
            </ul>
          </div>
        </div>

        {/* Nutrient Chart */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold mb-4 text-green-600">Nutrient Breakdown</h3>
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        {/* Recommendations and Tips */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-2 text-green-600">Recommendations</h3>
          <ul className="mb-4">
            {recommendations.map((rec, i) => (
              <li key={i}>• {rec}</li>
            ))}
          </ul>

          <h3 className="font-semibold mb-2 text-green-600">Health Tips</h3>
          <ul>
            {tips.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
