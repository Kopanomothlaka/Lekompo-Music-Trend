
import { Music, Youtube, Instagram, Twitter, Facebook, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const Footer = () => {
  const { admin } = useAdminAuth();

  return (
    <footer className="bg-black border-t border-gray-800/50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 animate-slide-in-left">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="p-3 spotify-green rounded-xl animate-pulse-glow">
                <Music className="h-7 w-7 text-black" />
              </div>
              <h3 className="text-3xl font-black gradient-text">Lovable Lekompo</h3>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed text-lg">
              Dedicated to preserving and promoting the beautiful Lekompo music genre. 
              Discover traditional rhythms, modern interpretations, and connect with artists worldwide.
            </p>
            <div className="flex space-x-4">
              <div className="p-3 bg-red-600/20 hover:bg-red-600 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110 group">
                <Youtube className="h-5 w-5 text-red-400 group-hover:text-white transition-colors" />
              </div>
              <div className="p-3 bg-pink-600/20 hover:bg-pink-600 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110 group">
                <Instagram className="h-5 w-5 text-pink-400 group-hover:text-white transition-colors" />
              </div>
              <div className="p-3 bg-blue-600/20 hover:bg-blue-600 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110 group">
                <Twitter className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <div className="p-3 bg-blue-700/20 hover:bg-blue-700 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110 group">
                <Facebook className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Home</Link></li>
              <li><Link to="/downloads" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Downloads</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">News</Link></li>
              <li><Link to="/videos" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Videos</Link></li>
              {admin ? (
                <li>
                  <Link to="/admin" className="text-green-400 hover:text-green-300 transition-colors duration-300 hover:translate-x-2 inline-block flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/admin/login" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    Admin Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
          
          {/* Community */}
          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <h4 className="text-white font-bold mb-6 text-lg">Community</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Artists</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Forum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Support</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              <p>&copy; 2025 Lekompo Music  . All rights reserved.</p>
              <p className="text-sm mt-1">Made with ❤️ for the Lekompo community.</p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="flex items-center space-x-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
              <button className="spotify-green text-black font-semibold px-6 py-2 rounded-full hover:scale-105 transition-transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
