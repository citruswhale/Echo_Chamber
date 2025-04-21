import React from 'react';
import { useTopicContext } from '../context/TopicContext';

const VoteBar = ({ topicId, proVotes, conVotes }) => {
  const { voteTopic, loading } = useTopicContext();
  
  const totalVotes = proVotes + conVotes;
  const proPercentage = totalVotes > 0 ? Math.round((proVotes / totalVotes) * 100) : 50;
  const conPercentage = 100 - proPercentage;
  
  const handleVote = async (side) => {
    await voteTopic(topicId, side);
  };
  
  return (
    <div className="mt-8 mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-green-600 font-medium">{proVotes} votes ({proPercentage}%)</span>
        <span className="text-red-600 font-medium">{conVotes} votes ({conPercentage}%)</span>
      </div>
      
      <div className="h-6 rounded-full overflow-hidden bg-gray-200 flex">
        <div 
          className="bg-green-500" 
          style={{ width: `${proPercentage}%` }}
        ></div>
        <div 
          className="bg-red-500" 
          style={{ width: `${conPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleVote('pro')}
          disabled={loading}
          className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          I Agree
        </button>
        <button
          onClick={() => handleVote('con')}
          disabled={loading}
          className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          I Disagree
        </button>
      </div>
    </div>
  );
};

export default VoteBar;
