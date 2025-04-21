import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchTopics, fetchTopicById, addTopic, updateTopicVotes } from '../services/api';

const TopicContext = createContext();

export const useTopicContext = () => useContext(TopicContext);

export const TopicProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all topics
  useEffect(() => {
    const getTopics = async () => {
      setLoading(true);
      try {
        const data = await fetchTopics();
        setTopics(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch topics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTopics();
  }, []);

  // Get a specific topic by ID
  const getTopic = async (id) => {
    setLoading(true);
    try {
      const data = await fetchTopicById(id);
      setCurrentTopic(data);
      setError(null);
      return data;
    } catch (err) {
      setError('Failed to fetch topic details');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Add a new topic
  const createTopic = async (topicData) => {
    setLoading(true);
    try {
      const newTopic = await addTopic(topicData);
      setTopics([...topics, newTopic]);
      setError(null);
      return newTopic;
    } catch (err) {
      setError('Failed to add new topic');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Vote on a topic
  const voteTopic = async (topicId, side) => {
    setLoading(true);
    try {
      const updatedTopic = await updateTopicVotes(topicId, side);
      
      // Update both the topics array and currentTopic if it's the same one
      setTopics(topics.map(topic => 
        topic.id === updatedTopic.id ? updatedTopic : topic
      ));
      
      if (currentTopic && currentTopic.id === updatedTopic.id) {
        setCurrentTopic(updatedTopic);
      }
      
      setError(null);
      return updatedTopic;
    } catch (err) {
      setError('Failed to update votes');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    topics,
    currentTopic,
    loading,
    error,
    getTopic,
    createTopic,
    voteTopic
  };

  return (
    <TopicContext.Provider value={value}>
      {children}
    </TopicContext.Provider>
  );
};