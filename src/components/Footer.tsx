
import { Music, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">Lovable Lekompo</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Dedicated to preserving and promoting the beautiful Lekompo music genre. 
              Discover traditional rhythms, modern interpretations, and connect with artists worldwide.
            </p>
            <div className="flex space-x-4">
              <div className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300 cursor-pointer">
                <Youtube className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#downloads" className="text-gray-400 hover:text-white transition-colors duration-300">Downloads</a></li>
              <li><a href="#news" className="text-gray-400 hover:text-white transition-colors duration-300">News</a></li>
              <li><a href="#videos" className="text-gray-400 hover:text-white transition-colors duration-300">Videos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Artists</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Forum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Lovable Lekompo. All rights reserved. Made with ❤️ for the Lekompo community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
