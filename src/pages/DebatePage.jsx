import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTopicContext } from '../context/TopicContext';
import Card from '../components/Card';
import ArgumentCard from '../components/ArgumentCard';
import VoteBar from '../components/VoteBar';

const DebatePage = () => {
  const { topicId } = useParams();
  const { getTopic, currentTopic, loading, error } = useTopicContext();
  
  useEffect(() => {
    if (topicId) {
      console.log("Calling getTopic with ID:", topicId);
      getTopic(topicId);
    }
  }, [topicId]);
  
  if (loading) {
    return <div className="text-center py-12">Loading topic data...</div>;
  }
  
  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }
  
  if (!currentTopic) {
    return <div className="text-center py-12">Topic not found</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{currentTopic.title}</h1>
        <p className="text-gray-600 mb-8">{currentTopic.description}</p>
        
        <VoteBar 
          topicId={currentTopic.id} 
          proVotes={currentTopic.proVotes} 
          conVotes={currentTopic.conVotes} 
        />
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Supporting Arguments</h2>
            {currentTopic.pros.length > 0 ? (
              currentTopic.pros.map(arg => (
                <ArgumentCard key={arg.id} argument={arg} type="pro" />
              ))
            ) : (
              <Card className="border-l-4 border-gray-300 bg-gray-50">
                <p className="text-gray-600">No supporting arguments yet.</p>
              </Card>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-red-700">Opposing Arguments</h2>
            {currentTopic.cons.length > 0 ? (
              currentTopic.cons.map(arg => (
                <ArgumentCard key={arg.id} argument={arg} type="con" />
              ))
            ) : (
              <Card className="border-l-4 border-gray-300 bg-gray-50">
                <p className="text-gray-600">No opposing arguments yet.</p>
              </Card>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            to={`/learn/${currentTopic.id}`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
          >
            Learn More About This Topic
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DebatePage;
