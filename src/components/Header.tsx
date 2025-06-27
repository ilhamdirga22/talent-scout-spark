
import { Search, Users, MessageCircle, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 sm:p-2 rounded-lg">
              <Search className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">TalentFinder</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Saved Candidates
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Messages
            </a>
          </nav>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center text-[10px] sm:text-xs">3</span>
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-2">
                Dashboard
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-2">
                Saved Candidates
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-2">
                Messages
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
