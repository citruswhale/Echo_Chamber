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

// Mock data
const mockTopics = [
  {
    id: "1",
    title: "Should social media platforms regulate misinformation?",
    description: "The debate over whether social platforms should be responsible for moderating false information",
    proVotes: 124,
    conVotes: 89,
    createdAt: "2023-04-10T12:00:00Z",
    pros: [
      { id: "p1", text: "Social media has become a primary news source and has a responsibility to ensure accuracy", source: "Harvard Media Studies 2022" },
      { id: "p2", text: "Misinformation can cause real-world harm, such as COVID vaccine hesitancy", source: "WHO Report 2021" },
      { id: "p3", text: "Platforms already moderate content, so they clearly have the capability", source: "Tech Transparency Report" }
    ],
    cons: [
      { id: "c1", text: "Platforms acting as arbiters of truth threatens free speech", source: "Free Press Alliance" },
      { id: "c2", text: "Content moderation at scale is nearly impossible to do well", source: "MIT Technology Review" },
      { id: "c3", text: "Who decides what's 'true' can lead to bias and censorship", source: "Journal of Media Ethics" }
    ],
    sources: [
      { title: "The impact of social media on information dissemination", url: "https://example.com/study1" },
      { title: "Free speech in digital platforms", url: "https://example.com/study2" }
    ]
  },
  {
    id: "2",
    title: "Is universal basic income a good solution to economic inequality?",
    description: "Exploring whether UBI could help address growing wealth gaps",
    proVotes: 207,
    conVotes: 184,
    createdAt: "2023-04-08T09:30:00Z",
    pros: [
      { id: "p1", text: "Provides a safety net that allows people to take risks and pursue education", source: "Economic Policy Institute" },
      { id: "p2", text: "Reduces administrative overhead of targeted welfare programs", source: "Public Admin Journal" },
      { id: "p3", text: "Pilot programs show improved mental health and quality of life", source: "Finland UBI Study 2020" }
    ],
    cons: [
      { id: "c1", text: "Extremely expensive to implement at a meaningful level", source: "Congressional Budget Office" },
      { id: "c2", text: "May reduce incentive to work and decrease productivity", source: "Labor Economics Review" },
      { id: "c3", text: "Could drive inflation if not properly implemented", source: "Monetary Policy Journal" }
    ],
    sources: [
      { title: "Analysis of UBI pilot programs worldwide", url: "https://example.com/ubi-study" },
      { title: "Economic impacts of guaranteed income", url: "https://example.com/econ-study" }
    ]
  },
  {
    id: "3",
    title: "Do video games contribute to violent behavior?",
    description: "Examining the controversial link between gaming and real-world aggression",
    proVotes: 78,
    conVotes: 245,
    createdAt: "2023-04-05T15:45:00Z",
    pros: [
      { id: "p1", text: "Some studies show short-term increases in aggressive thoughts after violent games", source: "Journal of Psychology 2019" },
      { id: "p2", text: "Children may be more susceptible to influence from violent media", source: "Child Development Studies" },
      { id: "p3", text: "Games can desensitize players to violence through repeated exposure", source: "Media Effects Research" }
    ],
    cons: [
      { id: "c1", text: "Crime rates have fallen as video game popularity has increased", source: "FBI Crime Statistics" },
      { id: "c2", text: "Most players can distinguish between game violence and reality", source: "Digital Media Research" },
      { id: "c3", text: "Many studies show no causal link between games and violent behavior", source: "American Psychological Association" }
    ],
    sources: [
      { title: "Comprehensive meta-analysis of video game studies", url: "https://example.com/game-study" },
      { title: "Media effects on behavior: A psychological perspective", url: "https://example.com/media-psych" }
    ]
  }
];