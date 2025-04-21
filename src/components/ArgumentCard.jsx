import React, { useState } from 'react';
import Card from './Card';

const ArgumentCard = ({ argument, type }) => {
  const [expanded, setExpanded] = useState(false);
  
  const typeColors = {
    pro: 'border-green-500 bg-green-50',
    con: 'border-red-500 bg-red-50'
  };
  
  const typeTextColors = {
    pro: 'text-green-700',
    con: 'text-red-700'
  };

  return (
    <Card className={`border-l-4 ${typeColors[type]} mb-4`}>
      <div className="flex justify-between items-start">
        <p className={`font-medium ${typeTextColors[type]}`}>{argument.text}</p>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-gray-500 hover:text-gray-700 ml-2"
        >
          {expanded ? 'Less' : 'More'}
        </button>
      </div>
      
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Source:</span> {argument.source}
          </p>
        </div>
      )}
    </Card>
  );
};

export default ArgumentCard;