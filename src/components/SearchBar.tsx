
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    onSearch(query.trim());
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for news topics..."
            className="pr-10 h-12 bg-secondary/80 text-foreground border-0 focus-visible:ring-2 focus-visible:ring-teal"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search size={20} className="text-muted-foreground" />
          </div>
        </div>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="h-12 bg-teal hover:bg-teal/80 text-white font-medium px-6"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
