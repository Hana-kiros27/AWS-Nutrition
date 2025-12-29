import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`py-6 border-t ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
      <div className="container mx-auto px-4 text-center">
        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          &copy; {new Date().getFullYear()} Evangadi Smart Nutrition. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;