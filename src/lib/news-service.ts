
import { v4 as uuid } from "uuid";
import type { NewsItem } from "@/components/NewsCard";

// Mock data for news articles with 2025 dates
const mockNews = [
  {
    source: { id: "bbc-news", name: "BBC News" },
    title: "Global Efforts to Combat Climate Change Achieving Progress",
    description:
      "New international agreements are showing positive results in reducing carbon emissions and adapting to climate challenges.",
    url: "https://www.bbc.com/news/climate",
    urlToImage: "https://picsum.photos/seed/climate2025/600/400",
    publishedAt: "2025-04-10T09:30:00Z",
    content: "Long form content about climate change progress in 2025..."
  },
  {
    source: { id: "cnn", name: "CNN" },
    title: "AI Regulation Framework Finally Implemented Globally",
    description:
      "After years of debate, a comprehensive global AI ethics framework has been adopted by major nations.",
    url: "https://www.cnn.com/tech",
    urlToImage: "https://picsum.photos/seed/ai2025/600/400",
    publishedAt: "2025-04-09T18:15:00Z",
    content: "Long form content about AI regulations in 2025..."
  },
  {
    source: { id: "reuters", name: "Reuters" },
    title: "Digital Currency Revolution Transforms Global Economy",
    description:
      "Central bank digital currencies are now operational in over 50 countries, reshaping international finance.",
    url: "https://www.reuters.com/markets",
    urlToImage: "https://picsum.photos/seed/finance2025/600/400",
    publishedAt: "2025-04-08T14:45:00Z",
    content: "Long form content about digital currencies in 2025..."
  },
  {
    source: { id: "the-guardian", name: "The Guardian" },
    title: "Healthcare Transformed by Personalized Medicine Breakthrough",
    description:
      "New advances in genetic medicine are enabling truly customized treatments for a wide range of conditions.",
    url: "https://www.theguardian.com/healthcare",
    urlToImage: "https://picsum.photos/seed/health2025/600/400",
    publishedAt: "2025-04-07T11:20:00Z",
    content: "Long form content about healthcare innovations in 2025..."
  },
  {
    source: { id: "wired", name: "Wired" },
    title: "Renewable Energy Now Primary Source in Most Developed Nations",
    description:
      "Solar and wind technologies have reached cost and efficiency levels that have made fossil fuels obsolete in many regions.",
    url: "https://www.wired.com/energy",
    urlToImage: "https://picsum.photos/seed/energy2025/600/400",
    publishedAt: "2025-04-06T16:10:00Z",
    content: "Long form content about renewable energy dominance in 2025..."
  },
  {
    source: { id: "bbc-sport", name: "BBC Sport" },
    title: "Virtual Reality Sports Tournaments Draw Record Viewership",
    description:
      "The convergence of traditional athletics and virtual reality competitions creates new opportunities for global engagement.",
    url: "https://www.bbc.com/sport/esports",
    urlToImage: "https://picsum.photos/seed/vrsports2025/600/400",
    publishedAt: "2025-04-05T08:45:00Z",
    content: "Long form content about VR sports in 2025..."
  }
];

// Generate more mock data with 2025 dates
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
  const currentDate = new Date(2025, 3); // April 2025
  
  for (let i = 0; i < count; i++) {
    // Create a date within April 2025
    const articleDate = new Date(currentDate);
    articleDate.setDate(articleDate.getDate() - i % 30);
    
    results.push({
      source: { 
        id: `source-${i}`, 
        name: ["CNN", "BBC", "Reuters", "Associated Press", "The Guardian", "The New York Times"][Math.floor(Math.random() * 6)]
      },
      title: `${topicToUse.charAt(0).toUpperCase() + topicToUse.slice(1)} News: ${i + 1} - Latest 2025 Developments`,
      description: `The latest 2025 developments in ${topicToUse} are transforming our understanding and approach to this critical area.`,
      url: `https://example.com/news/${topicToUse.toLowerCase().replace(/\s+/g, '-')}/${i + 1}`,
      urlToImage: `https://picsum.photos/seed/${topicToUse.toLowerCase().replace(/\s+/g, '-')}${i}2025/600/400`,
      publishedAt: articleDate.toISOString(),
      content: `Full 2025 article content about ${topicToUse}...`
    });
  }
  
  return results;
};

// The real API key implementation
const API_KEY = "pub_792934d8677ebfdcc4f49568d405fafd88d0d";
const BASE_URL = "https://newsdata.io/api/1/news";

export const searchNews = async (query: string): Promise<NewsItem[]> => {
  try {
    // Attempt to use the real API
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&q=${encodeURIComponent(query)}&language=en`);
    const data = await response.json();
    
    if (data.status === "success" && data.results && data.results.length > 0) {
      // Transform the API response to match our NewsItem interface
      return data.results.map((article: any) => ({
        id: uuid(),
        title: article.title,
        description: article.description || "No description available.",
        url: article.link,
        urlToImage: article.image_url || `https://picsum.photos/seed/${query.replace(/\s+/g, '')}/600/400`,
        publishedAt: article.pubDate || new Date().toISOString(),
        source: {
          name: article.source_id || "News Source"
        }
      }));
    } else {
      // Fall back to mock data if API call fails or returns no results
      console.log("API returned no results, using mock data");
      return fallbackToMockData(query);
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    return fallbackToMockData(query);
  }
};

// Fallback function that returns mock data
const fallbackToMockData = (query: string): NewsItem[] => {
  // Generate 12 mock news articles based on the query
  const newsResults = generateMoreMockNews(query, 12);
  
  // Add a unique ID to each article
  return newsResults.map((article) => ({
    ...article,
    id: uuid(),
  }));
};

// Initial trending news to display on first load
export const getTrendingNews = async (): Promise<NewsItem[]> => {
  try {
    // Try to get trending news from the API
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&category=top&language=en`);
    const data = await response.json();
    
    if (data.status === "success" && data.results && data.results.length > 0) {
      // Transform the API response to match our NewsItem interface
      return data.results.map((article: any) => ({
        id: uuid(),
        title: article.title,
        description: article.description || "No description available.",
        url: article.link,
        urlToImage: article.image_url || `https://picsum.photos/seed/${article.title.substring(0, 10).replace(/\s+/g, '')}/600/400`,
        publishedAt: article.pubDate || new Date().toISOString(),
        source: {
          name: article.source_id || "News Source"
        }
      }));
    } else {
      // Fall back to mock data if API call fails or returns no results
      console.log("API returned no trending results, using mock data");
      return fallbackToTrendingMockData();
    }
  } catch (error) {
    console.error("Error fetching trending news:", error);
    return fallbackToTrendingMockData();
  }
};

// Fallback function that returns mock trending data
const fallbackToTrendingMockData = (): NewsItem[] => {
  return mockNews.map((article) => ({
    ...article,
    id: uuid(),
  }));
};
