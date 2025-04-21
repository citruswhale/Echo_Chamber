import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTopicContext } from '../context/TopicContext';
import ExpandableCard from '../components/ExpandableCard';

const LearnMorePage = () => {
  const { topicId } = useParams();
  const { getTopic, currentTopic, loading, error } = useTopicContext();
  
  useEffect(() => {
    getTopic(topicId);
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{currentTopic.title}</h1>
        <p className="text-gray-600 mb-8">Dive deeper into different perspectives</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Pro Arguments</h2>
          {currentTopic.pros.map((arg, index) => (
            <ExpandableCard 
              key={arg.id} 
              title={`Argument ${index + 1}: ${arg.text.substring(0, 50)}...`}
            >
              <p className="mb-4">{arg.text}</p>
              <div className="bg-green-50 p-4 rounded-md">
                <h4 className="font-medium text-green-800 mb-2">Source:</h4>
                <p className="text-green-700">{arg.source}</p>
              </div>
            </ExpandableCard>
          ))}
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Con Arguments</h2>
          {currentTopic.cons.map((arg, index) => (
            <ExpandableCard 
              key={arg.id} 
              title={`Argument ${index + 1}: ${arg.text.substring(0, 50)}...`}
            >
              <p className="mb-4">{arg.text}</p>
              <div className="bg-red-50 p-4 rounded-md">
                <h4 className="font-medium text-red-800 mb-2">Source:</h4>
                <p className="text-red-700">{arg.source}</p>
              </div>
            </ExpandableCard>
          ))}
        </section>
        
        {currentTopic.sources && currentTopic.sources.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
            <ExpandableCard title="Recommended Reading">
              <ul className="space-y-2">
              {currentTopic.sources.map((source, index) => (
                  <li key={index}>
                    <a 
                      href={source.url}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </ExpandableCard>
          </section>
        )}
        
        <div className="text-center mt-12">
          <Link 
            to={`/debate/${currentTopic.id}`}
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-md mr-4"
          >
            Back to Debate
          </Link>
          <Link 
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
          >
            Explore More Topics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnMorePage;