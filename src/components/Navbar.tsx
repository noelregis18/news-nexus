
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

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and site name */}
          <div className="flex items-center">
            <div 
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer"
            >
              <h1 className="text-2xl font-bold text-teal mr-2">News</h1>
              <span className="text-2xl font-bold">Nexus</span>
            </div>
          </div>
          
          {/* Time and date display */}
          <div className="text-center md:text-left text-sm md:order-3 order-2 w-full md:w-auto">
            <div className="text-lightText">{formattedDate}</div>
            <div className="text-teal font-medium">{formattedTime}</div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4 md:order-2 order-3 w-full md:w-auto justify-center md:justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-lightText hover:text-teal"
            >
              <Search size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/favorites")}
              className="text-lightText hover:text-teal"
            >
              <BookMarked size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun size={20} className="text-lightText hover:text-teal" />
              ) : (
                <Moon size={20} className="text-lightText hover:text-teal" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
