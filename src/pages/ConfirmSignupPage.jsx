import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmSignUp } from '../services/authService';

const ConfirmSignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || '';

  const [email, setEmail] = useState(emailFromState);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // ✅ Success message state
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError('');
    setMessage(''); // Clear previous messages
    setLoading(true);

    try {
      await confirmSignUp(email, code);
      setMessage('✅ Account confirmed! You can now log in.'); // ✅ Show inline
      // Optionally redirect after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800 py-12 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
          Confirm Your Account
        </h1>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleConfirm} className="space-y-6">
          <div>
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label>Verification Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
          >
            {loading ? 'Confirming...' : 'Confirm Account'}
          </button>

          {/*  Inline success message */}
          {message && <p className="text-green-600 dark:text-green-400 text-center mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ConfirmSignupPage;
