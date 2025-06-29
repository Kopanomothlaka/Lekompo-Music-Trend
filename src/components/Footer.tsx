import { Music, Youtube, Instagram, Twitter, Facebook, Shield, Info, FileText, Scale, Mail, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { admin } = useAdminAuth();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically send the email to your backend
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter!",
    });
    setEmail("");
  };

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
              <h3 className="text-3xl font-black gradient-text">Lekompo</h3>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed text-lg">
              Dedicated to preserving and promoting the beautiful Lekompo music genre. 
              Discover traditional rhythms, modern interpretations, and connect with artists worldwide.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://youtube.com/@lekompomusic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-red-600/20 hover:bg-red-600 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110 group"
                aria-label="Follow us on YouTube"
              >
                <Youtube className="h-5 w-5 text-red-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://instagram.com/lekompomusic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-pink-600/20 hover:bg-pink-600 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110 group"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5 text-pink-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://twitter.com/lekompomusic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-blue-600/20 hover:bg-blue-600 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110 group"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://facebook.com/lekompomusic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-blue-700/20 hover:bg-blue-700 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110 group"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Home</Link></li>
              <li><Link to="/tracks" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Tracks</Link></li>
              <li><Link to="/downloads" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Downloads</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">News</Link></li>
              <li><Link to="/videos" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block">Videos</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block flex items-center gap-1">
                <Info className="h-4 w-4" />
                About Us
              </Link></li>
              <li><Link to="/education" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Education
              </Link></li>
            </ul>
          </div>
          
          {/* Legal & Support */}
          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <h4 className="text-white font-bold mb-6 text-lg">Legal & Support</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Privacy Policy
              </Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block flex items-center gap-1">
                <Scale className="h-4 w-4" />
                Terms of Service
              </Link></li>
              <li><a href="mailto:support@lekompomusic.com" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Support
              </a></li>
              <li><a href="mailto:info@lekompomusic.com" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 inline-block flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Contact
              </a></li>
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
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              <p>&copy; 2025 Lekompo Music. All rights reserved.</p>
              <p className="text-sm mt-1">Made with ❤️ for the Lekompo community.</p>
            </div>
            
            {/* Newsletter Signup */}
            <form onSubmit={handleNewsletterSignup} className="flex items-center space-x-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                aria-label="Email for newsletter subscription"
              />
              <button 
                type="submit"
                className="spotify-green text-black font-semibold px-6 py-2 rounded-full hover:scale-105 transition-transform"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
