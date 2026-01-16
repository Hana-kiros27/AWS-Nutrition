import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function MealTrackerPage() {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch meals from Lambda API
  const fetchMeals = async () => {
    if (!user?.email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://7i03f4vrh0.execute-api.us-east-1.amazonaws.com/list-meals", // Replace with your API Gateway endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch meals");

      // Sort meals by date descending
      const sortedMeals = data.meals.sort(
        (a, b) => new Date(b.mealDate) - new Date(a.mealDate)
      );

      setMeals(sortedMeals);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please log in to view your meals.</p>;

  return (
    <div className="container mx-auto max-w-3xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Meal Tracker</h2>

      {loading && <p className="text-center text-green-600">Loading meals...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {meals.length === 0 && !loading && <p className="text-center">No meals logged yet.</p>}

      <div className="space-y-6">
      {meals.map((meal) => (
  <div
    key={meal.mealId}
    className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-center"
  >
    <img
      src={meal.mealImageUrl}
      alt={`Meal ${meal.mealDate}`}
      className="w-48 h-48 object-cover rounded-lg border border-green-200"
    />

    <div className="flex-1">
      <p className="text-green-700 font-semibold mb-2">
        Date: {meal.mealDate}
      </p>

      {Array.isArray(meal.detectedFoods) && meal.detectedFoods.length > 0 && (
        <div>
          <p className="text-green-800 font-medium mb-1">Detected Foods:</p>
          <ul className="list-disc list-inside text-green-700">
            {meal.detectedFoods.map((food, idx) => (
              <li key={idx}>{food}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
))}

      </div>
    </div>
  );
}
