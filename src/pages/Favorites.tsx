
import React, { useState, useEffect } from "react";
import NewsGrid from "@/components/NewsGrid";
import { getFavorites, toggleFavorite } from "@/lib/favorites-service";
import { toast } from "sonner";
import type { NewsItem } from "@/components/NewsCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookmarkX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState<NewsItem[]>([]);
  const navigate = useNavigate();

  // Load favorites from local storage
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (article: NewsItem) => {
    toggleFavorite(article);
    setFavorites(getFavorites()); // Refresh favorites from localStorage
    toast.info("Removed from favorites");
  };

  const clearAllFavorites = () => {
    localStorage.removeItem("news-nexus-favorites");
    setFavorites([]);
    toast.success("All favorites cleared");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <Button
              variant="ghost"
              className="mb-4 md:mb-0 group"
              onClick={() => navigate("/")}
            >
              <ArrowLeft
                size={20}
                className="mr-2 group-hover:translate-x-[-3px] transition-transform"
              />
              Back to Search
            </Button>
          </div>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">Saved Articles</h1>
            {favorites.length > 0 && (
              <Button
                variant="ghost"
                className="ml-2 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                onClick={clearAllFavorites}
              >
                <BookmarkX size={18} className="mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {favorites.length > 0 ? (
          <NewsGrid
            articles={favorites}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-lightText/70 mb-6">
              You haven't saved any articles yet.
            </p>
            <Button onClick={() => navigate("/")} className="bg-teal hover:bg-teal/80">
              Search for News
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
