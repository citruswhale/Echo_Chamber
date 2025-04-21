import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Echo Chamber
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;