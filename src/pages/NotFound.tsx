import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-200 px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <AlertTriangle size={60} className="text-yellow-400 animate-bounce" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-xl text-slate-400 mb-6">Page Not Found</p>

        {/* Description */}
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.  
          Let's get you back on track.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="bg-sky-500 hover:bg-sky-600 font-bold text-white py-2 px-6 rounded-lg transition-colors duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
