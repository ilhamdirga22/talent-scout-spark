
import { Search, Users, MessageCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Search className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">TalentFinder</h1>
          </div>
          
          <nav className="flex items-center space-x-8">
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
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
