import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopicContext } from '../context/TopicContext';
import Card from '../components/Card';
import Button from '../components/Button';

const AddTopicPage = () => {
  const { topics, createTopic, loading } = useTopicContext();
  const navigate = useNavigate();
  
  const [formValues, setFormValues] = useState({
    title: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formValues.title.trim()) {
      newErrors.title = 'Topic title is required';
    } else if (formValues.title.length < 10) {
      newErrors.title = 'Topic title must be at least 10 characters';
    }
    
    if (!formValues.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formValues.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // For a real app, we'd collect more data, but for mock API this is sufficient
    const topicData = {
      ...formValues,
      pros: [],
      cons: [],
      sources: []
    };
    
    const newTopic = await createTopic(topicData);
    if (newTopic) {
      navigate(`/debate/${newTopic.id}`);
    }
  };
  
  const handleExistingTopicClick = (topicId) => {
    navigate(`/debate/${topicId}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to Echo Chamber
        </h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          Explore different perspectives on controversial topics
        </p>
        
        <Card className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Add a New Topic</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Topic Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g., Should social media platforms regulate content?"
                value={formValues.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Briefly describe what this topic is about and why it's controversial"
                value={formValues.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Topic'}
            </Button>
          </form>
        </Card>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Explore Existing Topics</h2>
        
        {loading && <p className="text-center">Loading topics...</p>}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map(topic => (
            <Card key={topic.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <div onClick={() => handleExistingTopicClick(topic.id)}>
                <h3 className="text-xl font-medium mb-2">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{topic.proVotes + topic.conVotes} votes</span>
                  <span>
                    {new Date(topic.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {!loading && topics.length === 0 && (
          <p className="text-center text-gray-600">
            No topics available. Be the first to add one!
          </p>
        )}
      </section>
    </div>
  );
};

export default AddTopicPage;
