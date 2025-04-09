
import React from "react";
import { useState, useEffect } from "react";
import { Moon, Sun, Search, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(currentTime);

  const formattedTime = currentTime.toLocaleTimeString();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setTimeout(() => {
        const searchInput = document.getElementById("navbarSearchInput");
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and site name */}
          <div className="flex items-center">
            <div 
              onClick={() => {
                scrollToTop();
                navigate("/");
              }}
              className="flex items-center cursor-pointer"
            >
              <h1 className="text-2xl font-bold text-red mr-2">News</h1>
              <span className="text-2xl font-bold">Nexus</span>
            </div>
          </div>
          
          {/* Time and date display */}
          <div className="text-center md:text-left text-sm md:order-3 order-2 w-full md:w-auto">
            <div className="text-lightText">{formattedDate}</div>
            <div className="text-red font-medium">{formattedTime}</div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4 md:order-2 order-3 w-full md:w-auto justify-center md:justify-end">
            {isSearchVisible && (
              <div className="relative animate-fade-in">
                <input 
                  id="navbarSearchInput"
                  type="text" 
                  placeholder="Search news..." 
                  className="py-2 px-4 pr-10 rounded-md bg-secondary/80 text-foreground border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value;
                      if (value.trim()) {
                        navigate(`/?q=${encodeURIComponent(value.trim())}`);
                        setIsSearchVisible(false);
                      }
                    }
                  }}
                  onBlur={() => setTimeout(() => setIsSearchVisible(false), 200)}
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="text-lightText hover:text-red"
            >
              <Search size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/favorites")}
              className="text-lightText hover:text-red"
            >
              <BookMarked size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun size={20} className="text-lightText hover:text-red" />
              ) : (
                <Moon size={20} className="text-lightText hover:text-red" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
