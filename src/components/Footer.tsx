
import React from "react";
import { Github, Linkedin, Twitter, Mail, Phone, Map } from "lucide-react";

const Footer = () => {
  const openMap = () => {
    window.open("https://maps.google.com/?q=Asansol,+West+Bengal,+India", "_blank");
  };

  return (
    <footer className="bg-black/40 border-t border-white/10 backdrop-blur-md py-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-teal mr-2">News</h2>
              <span className="text-2xl font-bold">Nexus</span>
            </div>
            <p className="mt-4 text-lightText/80 max-w-md">
              A modern news aggregator platform that lets you search, read, and save your favorite news articles from around the world.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Map size={18} className="text-teal" />
                <button
                  onClick={openMap}
                  className="hover:text-teal transition-colors"
                >
                  Asansol, West Bengal, India
                </button>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-teal" />
                <a
                  href="tel:+917319546900"
                  className="hover:text-teal transition-colors"
                >
                  +91 7319546900
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-teal" />
                <a
                  href="mailto:noel.regis04@gmail.com"
                  className="hover:text-teal transition-colors"
                >
                  noel.regis04@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.linkedin.com/in/noel-regis-aa07081b1/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary w-10 h-10 flex items-center justify-center rounded-full hover:bg-teal/20 transition-colors"
              >
                <Linkedin size={20} className="text-teal" />
              </a>
              <a
                href="https://github.com/noelregis18"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary w-10 h-10 flex items-center justify-center rounded-full hover:bg-teal/20 transition-colors"
              >
                <Github size={20} className="text-teal" />
              </a>
              <a
                href="https://x.com/NoelRegis8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary w-10 h-10 flex items-center justify-center rounded-full hover:bg-teal/20 transition-colors"
              >
                <Twitter size={20} className="text-teal" />
              </a>
              <a
                href="http://topmate.io/noel_regis"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary w-10 h-10 flex items-center justify-center rounded-full hover:bg-teal/20 transition-colors"
              >
                <span className="text-teal font-bold">TM</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-lightText/60">
          <p>&copy; {new Date().getFullYear()} News Nexus. Developed with ❤️ by Noel Regis</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
