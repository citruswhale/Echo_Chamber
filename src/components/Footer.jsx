import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} Echo Chamber - Opposing View Finder
        </p>
        <p className="text-center text-gray-500 text-sm mt-2">
          Breaking echo chambers by showing both sides of controversial topics
        </p>
      </div>
    </footer>
  );
};

export default Footer;