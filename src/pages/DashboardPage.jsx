import { useEffect, useState } from 'react';
import { getLatestMeal } from '../services/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const data = await getLatestMeal();
        setMealData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMeal();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!mealData) return <p className="text-center mt-20">No meals found.</p>;

  const { imageUrl, detectedFoods, calories, protein, carbs, fat, recommendations, tips } = mealData;

  // Chart data
  const chartData = {
    labels: ['Calories', 'Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        label: 'Nutrient Intake',
        data: [calories, protein, carbs, fat],
        backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#fbbf24'],
      },
    ],
  };
  

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Nutrition Dashboard</h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Meal Image */}
        <div className="flex-1">
          <h3 className="font-bold mb-2">Your Meal</h3>
          <img src={imageUrl} alt="Meal" className="rounded-lg shadow-md w-full object-cover" />
        </div>

        {/* Nutrition Info */}
        <div className="flex-1">
          <h3 className="font-bold mb-2">Nutrition Summary</h3>
          <ul className="mb-4">
            {detectedFoods.map((food, i) => (
              <li key={i}>• {food}</li>
            ))}
            <li>Calories: {calories} kcal</li>
            <li>Protein: {protein} g</li>
            <li>Carbs: {carbs} g</li>
            <li>Fat: {fat} g</li>
          </ul>

          <h3 className="font-bold mb-2">Recommendations</h3>
          <ul className="mb-4">
            {recommendations.map((rec, i) => (
              <li key={i}>• {rec}</li>
            ))}
          </ul>

          <h3 className="font-bold mb-2">Health Tips</h3>
          <ul>
            {tips.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nutrient Chart */}
      <div className="mb-8">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>

      {/* Optional: Download / Weekly Summary */}
      <div className="text-center">
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          Download Weekly Summary
        </button>
      </div>
    </div>
  );
}
