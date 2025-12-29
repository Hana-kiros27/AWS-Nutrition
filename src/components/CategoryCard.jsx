import { Link } from 'react-router-dom';

const CategoryCard = ({ name, image, slug }) => {
  return (
    <Link 
      to={`/shop?category=${slug}`}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-200 dark:border-green-800 mb-4">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;