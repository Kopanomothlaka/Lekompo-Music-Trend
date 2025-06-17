import { Music, Menu, X, Shield, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-gray-800/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 animate-slide-in-left">
            <div className="p-2 spotify-green rounded-xl animate-pulse-glow">
              <Music className="h-6 w-6 text-black" />
            </div>
            <h1 className="text-2xl font-black gradient-text">Lekompo</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
            <Link to="/" className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-105 font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/tracks" className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-105 font-medium relative group">
              Tracks
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/news" className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-105 font-medium relative group">
              News
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/videos" className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-105 font-medium relative group">
              Videos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Admin Section */}
            {admin && (
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="text-green-400 hover:text-green-300 transition-all duration-300 hover:scale-105 font-medium relative group flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Admin
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Button
                  onClick={handleAdminLogout}
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-green-400 transition-colors p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/tracks" 
                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tracks
              </Link>
              <Link 
                to="/news" 
                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              <Link 
                to="/videos" 
                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Videos
              </Link>
              
              {/* Mobile Admin Section */}
              {admin && (
                <>
                  <Link 
                    to="/admin" 
                    className="text-green-400 hover:text-green-300 transition-colors font-medium flex items-center gap-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleAdminLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors font-medium flex items-center gap-1 text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Admin Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;