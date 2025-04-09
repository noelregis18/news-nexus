
import type { NewsItem } from "@/components/NewsCard";

const FAVORITES_KEY = "news-nexus-favorites";

export const getFavorites = (): NewsItem[] => {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error("Error getting favorites from localStorage:", error);
    return [];
  }
};

export const saveFavorite = (article: NewsItem): void => {
  try {
    const currentFavorites = getFavorites();
    
    // Check if article is already in favorites
    if (!currentFavorites.some((fav) => fav.id === article.id)) {
      const updatedFavorites = [...currentFavorites, article];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error("Error saving favorite to localStorage:", error);
  }
};

export const removeFavorite = (articleId: string): void => {
  try {
    const currentFavorites = getFavorites();
    const updatedFavorites = currentFavorites.filter(
      (article) => article.id !== articleId
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing favorite from localStorage:", error);
  }
};

export const toggleFavorite = (article: NewsItem): boolean => {
  try {
    const currentFavorites = getFavorites();
    const isCurrentlyFavorite = currentFavorites.some(
      (fav) => fav.id === article.id
    );
    
    if (isCurrentlyFavorite) {
      removeFavorite(article.id);
      return false;
    } else {
      saveFavorite(article);
      return true;
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return false;
  }
};
