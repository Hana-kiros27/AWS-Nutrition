import { Link, NavLink } from 'react-router-dom';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext'; // import auth
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth(); // get logged-in user
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Only show Plans and Tracker if user is logged in
  const navItems = [
    { name: 'Home', path: '/' },
    ...(user
      ? [
          { name: 'Plans', path: '/plans' },
          { name: 'Meal Tracker', path: '/tracker' },
        ]
      : []),
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-green-600 dark:text-green-400 tracking-wide"
          >
            Evangadi <span className="text-gray-800 dark:text-gray-200">Smart Nutrition</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Theme Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems} // pass the updated links to mobile menu
      />
    </header>
  );
};

export default Header;
