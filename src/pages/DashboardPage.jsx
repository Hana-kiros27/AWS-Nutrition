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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const navigate = useNavigate();
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // ==================== FETCH BEDROCK ENRICHMENT ====================
  async function enrichNutrition(foods) {
    if (!foods || foods.length === 0) {
      return { enrichedFoods: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } };
    }

    try {
      const res = await fetch(
        "https://fm4lsycu14.execute-api.us-east-1.amazonaws.com/enrich",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ detectedFoods: foods }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to enrich nutrition");
      }

      return await res.json(); // { enrichedFoods: [...], totals: { calories, protein, carbs, fat } }
    } catch (err) {
      console.error("Enrichment error:", err);
      return { enrichedFoods: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } };
    }
  }

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) setProfileImage(storedImage);

    async function fetchLatestMeal() {
      const email = localStorage.getItem("email");
      if (!email) {
        setError("Please log in to view your meals.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Step 1: Fetch latest meal from your DynamoDB Lambda
        const res = await fetch(
          "https://90vl1l6v7i.execute-api.us-east-1.amazonaws.com/nutrition",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch latest meal");
        }

        const data = await res.json();

        // Step 2: Enrich detectedFoods using Bedrock Lambda
        const enrichment = await enrichNutrition(data.detectedFoods || []);

        // Step 3: Combine data and set state
        setMealData({
          ...data,
          enrichedFoods: enrichment.enrichedFoods,
          nutrition: enrichment.totals,
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestMeal();
  }, []);

  // ==================== RENDER LOADING / ERROR ====================
  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

  // ==================== DATA ====================
  const detectedFoods = mealData?.enrichedFoods?.length
    ? mealData.enrichedFoods
    : mealData?.detectedFoods?.length
    ? mealData.detectedFoods
    : ["No foods detected"];

  const nutrition = mealData?.nutrition || { calories: 0, protein: 0, carbs: 0, fat: 0 };
  const recommendations = mealData?.recommendations || ["No recommendations yet"];
  const tips = mealData?.tips || ["No tips yet"];
  const imageUrl =
    mealData?.imageUrl?.startsWith("http")
      ? mealData.imageUrl
      : "https://via.placeholder.com/400x300?text=No+Meal+Uploaded";

  // ==================== CHART ====================
  const chartData = {
    labels: ["Calories", "Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [nutrition.calories, nutrition.protein, nutrition.carbs, nutrition.fat],
        backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#fbbf24"],
      },
    ],
  };

  // ==================== RENDER ====================
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-green-100 shadow-lg p-6 flex flex-col items-center md:items-stretch">
        <div className="flex flex-col items-center mb-8">
          <img
            src={profileImage || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full mb-3 object-cover"
          />
          <p className="font-semibold text-sm text-green-700 mb-2">
            {localStorage.getItem("email")?.split("@")[0] || "User"}
          </p>
        </div>
        <nav className="flex flex-col space-y-3">
          <button onClick={() => navigate("/dashboard")} className="w-full text-left px-4 py-2 rounded hover:bg-green-200">
            📊 Dashboard
          </button>
          <button onClick={() => navigate("/meal-tracker")} className="w-full text-left px-4 py-2 rounded hover:bg-green-200">
            🍽 Meal Tracker
          </button>
          <button onClick={() => navigate("/meal-plans")} className="w-full text-left px-4 py-2 rounded hover:bg-green-200">
            📋 Meal Plans
          </button>
          <button onClick={() => navigate("/upload")} className="w-full text-left px-4 py-2 rounded hover:bg-green-200">
            📷 Upload Meal
          </button>
          <button onClick={() => navigate("/settings")} className="w-full text-left px-4 py-2 rounded hover:bg-green-200">
            ⚙ Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left text-green-600">Nutrition Dashboard</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Meal Image */}
          <div className="bg-white p-5 rounded shadow flex flex-col items-center">
            <h3 className="font-semibold mb-3 text-green-600">Your Meal</h3>
            <img src={imageUrl} alt="Meal" className="rounded-lg w-full object-cover" />
          </div>

          {/* Nutrition Summary */}
          <div className="bg-white p-5 rounded shadow">
            <h3 className="font-semibold mb-3 text-green-600">Nutrition Summary</h3>
            <ul className="space-y-1">
              {detectedFoods.map((food, i) =>
                typeof food === "string" ? (
                  <li key={i}>• {food}</li>
                ) : (
                  <li key={i}>
                    • {food.name || JSON.stringify(food)}: {food.calories || 0} kcal
                  </li>
                )
              )}
              <li>Calories: {nutrition.calories} kcal</li>
              <li>Protein: {nutrition.protein} g</li>
              <li>Carbs: {nutrition.carbs} g</li>
              <li>Fat: {nutrition.fat} g</li>
            </ul>
          </div>
        </div>

        {/* Nutrient Chart */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold mb-4 text-green-600">Nutrient Breakdown</h3>
          <Bar
            key={`${nutrition.calories}-${nutrition.protein}-${nutrition.carbs}-${nutrition.fat}`}
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
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
