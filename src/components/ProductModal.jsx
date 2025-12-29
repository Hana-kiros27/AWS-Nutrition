import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductModal = () => {
  const { 
    isProductModalOpen, 
    setIsProductModalOpen, 
    currentProduct,
    addToCart
  } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (isProductModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isProductModalOpen]);

  if (!isProductModalOpen || !currentProduct) return null;

  const handleAddToCart = () => {
    addToCart(currentProduct.id);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={() => setIsProductModalOpen(false)}
    >
      <div 
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Fixed in top-right corner */}
        <button 
          onClick={() => setIsProductModalOpen(false)}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Close product details"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-y-auto">
          <div className="flex justify-center">
            <img 
              src={currentProduct.imageSrc} 
              alt={currentProduct.name}
              className="w-full max-w-md max-h-[300px] md:max-h-[400px] h-auto rounded-lg object-cover"
            />
          </div>
          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {currentProduct.name}
            </h2>
            <p className="text-green-600 dark:text-green-400 font-bold text-xl mb-4">
              ${currentProduct.price.toFixed(2)}
              {currentProduct.unit && (
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                  {currentProduct.unit}
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Category: <span className="capitalize">{currentProduct.category}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {currentProduct.description}
            </p>
            <button 
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`w-full py-3 px-6 rounded-full font-medium transition duration-300 ${
                addedToCart 
                  ? 'bg-green-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;