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
{/* Why Smart Nutrition Section */}
<section className="py-12 bg-white dark:bg-gray-900">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-600">
      Why Smart Nutrition?
    </h2>

    <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-8">
      Because healthy eating shouldn’t be confusing.  
      Smart Nutrition helps you understand what you eat, improve daily habits,
      and reach your goals with AI-powered guidance.
    </p>

    {/* Image */}
    <div className="flex justify-center">
      <img
        src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
        alt="Healthy nutrition and lifestyle"
        className="w-full max-w-3xl rounded-xl shadow-lg object-cover"
      />
    </div>
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
{/* Technology Trust Section */}
<section className="py-12 bg-gray-100 dark:bg-gray-800">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
      Built with Modern Cloud & AI Technologies
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
      <div className="bg-white dark:bg-green-900 p-4 rounded shadow">
        ☁️ <strong>AWS Lambda</strong>
        <p className="mt-2">Serverless backend processing</p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
        🔐 <strong>Amazon Cognito</strong>
        <p className="mt-2">Secure authentication</p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
        🧠 <strong>Amazon Bedrock</strong>
        <p className="mt-2">AI meal analysis & planning</p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
        📊 <strong>DynamoDB</strong>
        <p className="mt-2">Fast & scalable data storage</p>
      </div>
    </div>
  </div>
</section>
{/* Personal Promise Section */}
<section className="py-12 bg-white dark:bg-gray-900">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6 text-green-600">
      Your Health. Your Goals. Your Assistant.
    </h2>

    <div className="grid md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300">
      <div className="p-4">
        🎯 <h3 className="font-semibold mt-2">Goal-Based Plans</h3>
        <p>Lose weight, gain muscle, or stay fit with AI-generated meal plans.</p>
      </div>

      <div className="p-4">
        📸 <h3 className="font-semibold mt-2">Just Upload & Learn</h3>
        <p>Take a photo of your meal and get instant nutritional insights.</p>
      </div>

      <div className="p-4">
        📈 <h3 className="font-semibold mt-2">Track Progress</h3>
        <p>See trends, nutrients, and improvements over time.</p>
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
