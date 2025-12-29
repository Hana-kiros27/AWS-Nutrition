import { useEffect, useState } from 'react';
import { getMealHistory } from '../services/api';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getMealHistory();
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading history...</p>;
  if (!history.length) return <p className="text-center mt-20">No meal history found.</p>;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Meal History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history.map((meal, index) => (
          <div key={index} className="card p-4">
            <img src={meal.imageUrl} alt="Meal" className="rounded-lg mb-2 w-full object-cover" />
            <p><strong>Date:</strong> {new Date(meal.date).toLocaleDateString()}</p>
            <p><strong>Calories:</strong> {meal.calories} kcal</p>
            <p><strong>Protein:</strong> {meal.protein} g</p>
            <p><strong>Carbs:</strong> {meal.carbs} g</p>
            <p><strong>Fat:</strong> {meal.fat} g</p>
          </div>
        ))}
      </div>
    </div>
  );
}
