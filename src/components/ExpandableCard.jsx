import React, { useState } from 'react';
import Card from './Card';

const ExpandableCard = ({ title, children, initiallyExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  
  return (
    <Card className="mb-4">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <span className="text-gray-500">
          {isExpanded ? '▲' : '▼'}
        </span>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </Card>
  );
};

export default ExpandableCard;