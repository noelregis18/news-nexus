
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import NewsGrid from "@/components/NewsGrid";
import { getTrendingNews, searchNews } from "@/lib/news-service";
import { getFavorites, toggleFavorite } from "@/lib/favorites-service";
import { toast } from "sonner";
import type { NewsItem } from "@/components/NewsCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [favorites, setFavorites] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();

  // Parse URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    
    if (q) {
      setSearchQuery(q);
      handleSearch(q);
    } else {
      loadTrendingNews();
    }
  }, [location.search]);

  // Load initial trending news
  const loadTrendingNews = async () => {
    try {
      setIsLoading(true);
      const trending = await getTrendingNews();
      setArticles(trending);
    } catch (error) {
      console.error("Error loading trending news:", error);
      toast.error("Failed to load trending news");
    } finally {
      setIsLoading(false);
    }
  };

  // Load favorites from local storage
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setSearchQuery(query);
      
      // Update URL with search query
      if (location.search !== `?q=${encodeURIComponent(query)}`) {
        navigate(`/?q=${encodeURIComponent(query)}`);
      }
      
      const results = await searchNews(query);
      setArticles(results);
      
      if (results.length === 0) {
        toast.info("No news found for your query. Try something else!");
      } else {
        toast.success(`Found ${results.length} articles about "${query}"`);
      }
    } catch (error) {
      console.error("Error searching news:", error);
      toast.error("Failed to search news. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (article: NewsItem) => {
    const isFavorite = toggleFavorite(article);
    setFavorites(getFavorites()); // Refresh favorites from localStorage
    
    if (isFavorite) {
      toast.success("Added to favorites");
    } else {
      toast.info("Removed from favorites");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero section with search */}
        <section className="py-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-red">News</span> Nexus
          </h1>
          <p className="text-lg md:text-xl text-lightText/80 max-w-3xl mx-auto mb-8">
            Search for the latest news on any topic from around the world
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {/* News results section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">
            {searchQuery
              ? `Latest News about "${searchQuery}"`
              : "Trending News (April 2025)"}
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse text-red">Loading news...</div>
            </div>
          ) : articles.length > 0 ? (
            <NewsGrid
              articles={articles}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-lightText/70">
                No articles found. Try a different search term.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
