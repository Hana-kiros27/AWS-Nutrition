import React from 'react';

const About = () => {
  return (
    <main className="py-12 dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-6 relative">
          About Us
          <span className="absolute bottom-0 left-0 w-20 h-1 bg-green-400 rounded-full"></span>
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
          Welcome to Evangadi Smart Nutrition! We are dedicated to helping you achieve a healthy lifestyle
          by providing personalized meal plans, nutrition tips, and tracking tools.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
          Our mission is to make nutrition simple and accessible to everyone. Whether you are trying to
          maintain a balanced diet, lose weight, or just eat healthier, we provide the resources and guidance
          to help you succeed.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Join our community today and start your journey to a healthier you!
        </p>
      </div>
    </main>
  );
};

export default About;
