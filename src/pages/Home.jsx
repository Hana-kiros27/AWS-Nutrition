import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Nutrition Assistant</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Upload your meals and get instant nutrition insights, personalized recommendations, and health tips.
          </p>
          <Link 
            to="/login" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <h3 className="font-bold text-xl mb-2">Login / Signup</h3>
              <p>Enter your email and password. Authentication handled securely by Amazon Cognito.</p>
            </div>
            <div className="card text-center">
              <h3 className="font-bold text-xl mb-2">Profile</h3>
              <p>Enter age, weight, height, and activity level. Data stored in DynamoDB via API Gateway + Lambda.</p>
            </div>
            <div className="card text-center">
              <h3 className="font-bold text-xl mb-2">Upload Meal</h3>
              <p>Upload a meal image from your computer. Preview image and submit to trigger S3 + Bedrock analysis.</p>
            </div>
            <div className="card text-center">
              <h3 className="font-bold text-xl mb-2">Dashboard</h3>
              <p>View detected food items, calories, nutrients, personalized recommendations, and health tips. Charts show trends over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section className="py-12 bg-green-500 dark:bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Track Your Nutrition?</h2>
          <p className="text-xl mb-6">Sign up now and start receiving personalized nutrition insights instantly.</p>
          <Link 
            to="/login" 
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Login / Signup
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
