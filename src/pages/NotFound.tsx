import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft, FileX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center relative z-10 max-w-lg">
        {/* Icon */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-8 mx-auto w-fit">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 mb-4">
            <FileX className="h-16 w-16 text-gray-400 mx-auto" />
          </div>

          {/* Error code */}
          <div className="text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            404
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-1">
            Page Not Found
          </div>
          <div className="text-sm text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Oops! This page doesn't exist
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The page you're trying to access might have been removed, renamed,
            or is temporarily unavailable. Let's get you back on track.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 hover:scale-105 shadow-lg font-medium"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </Link>

            {/* <Link 
              to="/search" 
              className="inline-flex items-center bg-white text-gray-700 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:scale-105 font-medium"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Talent
            </Link> */}
          </div>

          {/* Back link */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go back to previous page
            </button>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            If you believe this is an error, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
