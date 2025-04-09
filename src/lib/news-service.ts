
import { v4 as uuid } from "uuid";
import type { NewsItem } from "@/components/NewsCard";

// Mock data for news articles
const mockNews = [
  {
    source: { id: "bbc-news", name: "BBC News" },
    title: "The Impact of Climate Change on Global Agriculture",
    description:
      "Scientists predict significant changes in agricultural yields due to rising global temperatures and extreme weather events.",
    url: "https://www.bbc.com/news/climate",
    urlToImage: "https://picsum.photos/seed/climate/600/400",
    publishedAt: "2023-04-10T09:30:00Z",
    content: "Long form content about climate change impacts on agriculture..."
  },
  {
    source: { id: "cnn", name: "CNN" },
    title: "Tech Giants Announce New AI Regulations",
    description:
      "Major technology companies have agreed on a framework for responsible AI development and usage.",
    url: "https://www.cnn.com/tech",
    urlToImage: "https://picsum.photos/seed/tech/600/400",
    publishedAt: "2023-04-09T18:15:00Z",
    content: "Long form content about AI regulations..."
  },
  {
    source: { id: "reuters", name: "Reuters" },
    title: "Global Markets React to Central Bank Decisions",
    description:
      "Stock markets worldwide respond to the latest interest rate announcements from major central banks.",
    url: "https://www.reuters.com/markets",
    urlToImage: "https://picsum.photos/seed/markets/600/400",
    publishedAt: "2023-04-09T14:45:00Z",
    content: "Long form content about market reactions..."
  },
  {
    source: { id: "the-guardian", name: "The Guardian" },
    title: "Healthcare Innovations Addressing Global Challenges",
    description:
      "New medical technologies and approaches are helping to solve healthcare access issues in developing regions.",
    url: "https://www.theguardian.com/healthcare",
    urlToImage: "https://picsum.photos/seed/healthcare/600/400",
    publishedAt: "2023-04-08T11:20:00Z",
    content: "Long form content about healthcare innovations..."
  },
  {
    source: { id: "wired", name: "Wired" },
    title: "Renewable Energy Revolution: The Path to Carbon Neutrality",
    description:
      "How renewable energy sources are transforming the global energy landscape and combating climate change.",
    url: "https://www.wired.com/energy",
    urlToImage: "https://picsum.photos/seed/energy/600/400",
    publishedAt: "2023-04-07T16:10:00Z",
    content: "Long form content about renewable energy..."
  },
  {
    source: { id: "bbc-sport", name: "BBC Sport" },
    title: "Olympic Athletes Prepare for Summer Games",
    description:
      "Athletes from around the world intensify their training regimes as the Summer Olympics approach.",
    url: "https://www.bbc.com/sport/olympics",
    urlToImage: "https://picsum.photos/seed/olympics/600/400",
    publishedAt: "2023-04-06T08:45:00Z",
    content: "Long form content about Olympic preparations..."
  }
];

// Generate more mock data
const generateMoreMockNews = (query: string, count: number) => {
  const topics = [
    "technology", 
    "science", 
    "health", 
    "business", 
    "entertainment", 
    "sports", 
    "politics"
  ];
  
  let topicToUse = topics.find(topic => query.toLowerCase().includes(topic.toLowerCase()));
  
  if (!topicToUse) {
    // If no specific topic found, use the query itself
    topicToUse = query;
  }
  
  const results = [];
  
  for (let i = 0; i < count; i++) {
    results.push({
      source: { 
        id: `source-${i}`, 
        name: ["CNN", "BBC", "Reuters", "Associated Press", "The Guardian", "The New York Times"][Math.floor(Math.random() * 6)]
      },
      title: `${topicToUse.charAt(0).toUpperCase() + topicToUse.slice(1)} News: ${i + 1} - Latest Developments and Updates`,
      description: `The latest developments in ${topicToUse} are transforming our understanding and approach to this critical area.`,
      url: `https://example.com/news/${topicToUse.toLowerCase().replace(/\s+/g, '-')}/${i + 1}`,
      urlToImage: `https://picsum.photos/seed/${topicToUse.toLowerCase().replace(/\s+/g, '-')}${i}/600/400`,
      publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
      content: `Full article content about ${topicToUse}...`
    });
  }
  
  return results;
};

export const searchNews = async (query: string): Promise<NewsItem[]> => {
  // Simulating an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate 12 mock news articles based on the query
      const newsResults = generateMoreMockNews(query, 12);
      
      // Add a unique ID to each article (in a real API, articles might already have IDs)
      const articlesWithIds: NewsItem[] = newsResults.map((article) => ({
        ...article,
        id: uuid(),
      }));
      
      resolve(articlesWithIds);
    }, 1500); // Simulate network delay
  });
};

// Initial trending news to display on first load
export const getTrendingNews = async (): Promise<NewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Use the mock data for trending news
      const articlesWithIds: NewsItem[] = mockNews.map((article) => ({
        ...article,
        id: uuid(),
      }));
      
      resolve(articlesWithIds);
    }, 1000);
  });
};
