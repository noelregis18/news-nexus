
import React from "react";
import NewsCard, { NewsItem } from "./NewsCard";

interface NewsGridProps {
  articles: NewsItem[];
  favorites: NewsItem[];
  onToggleFavorite: (article: NewsItem) => void;
}

const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  favorites,
  onToggleFavorite,
}) => {
  const isArticleFavorite = (article: NewsItem) => {
    return favorites.some((fav) => fav.id === article.id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-fade-in">
      {articles.map((article) => (
        <div key={article.id} className="h-full">
          <NewsCard
            article={article}
            isFavorite={isArticleFavorite(article)}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
