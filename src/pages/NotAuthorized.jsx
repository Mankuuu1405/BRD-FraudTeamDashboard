import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Access Denied
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        You do not have permission to view this page.  
        If you believe this is a mistake, contact your administrator.
      </p>

      <Link
        to="/home"
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
}
