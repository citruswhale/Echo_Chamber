// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
// Fetch all topics
export const fetchTopics = async () => {
  await delay(500); // Simulate network request
  return [...mockTopics];
};

// Fetch a single topic by ID
export const fetchTopicById = async (id) => {
  await delay(300);
  console.log("Looking for topic ID:", id);
  console.log("Available topics:", mockTopics);
  const topic = mockTopics.find(topic => topic.id === id);
  console.log("Found topic:", topic);
  if (!topic) {
    throw new Error('Topic not found');
  }
  return {...topic};
};

// Add a new topic
export const addTopic = async (topicData) => {
  await delay(800);
  const newTopic = {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    proVotes: 0,
    conVotes: 0,
    ...topicData
  };
  mockTopics.push(newTopic);
  return newTopic;
};

// Update votes for a topic
export const updateTopicVotes = async (topicId, side) => {
  await delay(300);
  const topicIndex = mockTopics.findIndex(topic => topic.id === topicId);
  
  if (topicIndex === -1) {
    throw new Error('Topic not found');
  }
  
  const updatedTopic = {...mockTopics[topicIndex]};
  
  if (side === 'pro') {
    updatedTopic.proVotes += 1;
  } else if (side === 'con') {
    updatedTopic.conVotes += 1;
  } else {
    throw new Error('Invalid side');
  }
  
  mockTopics[topicIndex] = updatedTopic;
  return updatedTopic;
};