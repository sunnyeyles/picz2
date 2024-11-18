// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
// import { FormEvent } from "react";

const NotFound = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // const handleSearch = (e: FormEvent) => {
  //   e.preventDefault();
  //   console.log("Searching for:", searchQuery);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-4 py-8 space-y-8 text-center">
        <h1 className="text-6xl font-extrabold">404</h1>
        <h2 className="text-2xl font-semibold">Oops! Page not found</h2>
        <p className="text-lg">
          The page you're looking for doesn't seem to exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-4 py-2 border rounded-md font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </button>
        </div>

        <p className="text-sm">
          If you think this is a mistake, please{" "}
          <a href="/contact" className="underline font-medium">
            contact our support team
          </a>
          .
        </p>
      </div>
    </div>
  );
};
export default NotFound;
