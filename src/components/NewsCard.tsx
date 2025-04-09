
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookmarkPlus, BookmarkCheck, ExternalLink } from "lucide-react";
import placeholder from "/placeholder.svg";

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsCardProps {
  article: NewsItem;
  isFavorite: boolean;
  onToggleFavorite: (article: NewsItem) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, isFavorite, onToggleFavorite }) => {
  const date = new Date(article.publishedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Extract domain name from URL
  const getSourceDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch {
      return article.source.name;
    }
  };

  return (
    <Card className="news-card hover-scale overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.urlToImage || placeholder}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholder;
          }}
        />
        <div className="card-gradient"></div>
        <div className="absolute top-2 left-2 bg-black/50 text-xs px-2 py-1 rounded">
          {article.source.name || getSourceDomain(article.url)}
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
          {article.description || "No description available."}
        </p>
        <div className="text-xs text-muted-foreground">{formattedDate}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => onToggleFavorite(article)}
        >
          {isFavorite ? (
            <>
              <BookmarkCheck className="mr-1 h-4 w-4 text-teal" /> Saved
            </>
          ) : (
            <>
              <BookmarkPlus className="mr-1 h-4 w-4" /> Save
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(article.url, "_blank")}
          className="text-xs"
        >
          <ExternalLink className="mr-1 h-4 w-4" /> Read
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
