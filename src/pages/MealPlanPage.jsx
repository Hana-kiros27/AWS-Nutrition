import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function MealPlanPage() {
  const { user } = useAuth();
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate daily plan by calling your Lambda
  const generatePlan = async () => {
    if (!user?.email) {
      setError("No user logged in.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://kqbg508gxg.execute-api.us-east-1.amazonaws.com/generate-daily-plan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            age: user.age || 25,
            weight: user.weight || 70,
            height: user.height || 170,
            activity: user.activity || "moderate",
            goal: user.goal || "lose_weight",
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate plan");
      }

      const data = await res.json();
      setMealPlan(data.meals);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        Daily Meal Plan
      </h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={generatePlan}
          className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300"
        >
          {loading ? "Generating..." : "Generate Daily Plan"}
        </button>
      </div>

      {error && <p className="text-red-600 text-center mb-6">{error}</p>}

      {mealPlan && (
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(mealPlan).map(([mealName, info]) => (
            <div
              key={mealName}
              className="bg-green-100 p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold capitalize mb-2 text-green-800">
                {mealName}
              </h3>
              <p className="italic mb-2 text-green-900">{info.meal}</p>
              <ul className="text-green-900 space-y-1">
                <li>Calories: {info.calories} kcal</li>
                <li>Protein: {info.protein ?? 0} g</li>
                <li>Carbs: {info.carbs ?? 0} g</li>
                <li>Fat: {info.fat ?? 0} g</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
