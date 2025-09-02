import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import Services from "../services/auth";

const EmailEntry = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .max(254, "Email must be less than 254 characters"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await emailSchema.validate({ email });
      const response = await Services.checkEmailExists(email);

      if (!response) {
        setError("Failed to check email");
        return;
      }
      if (response) {
        navigate("/enter-code", { state: { email } });
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      } else {
        setError("Failed to check email. Try again.");
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Enter Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We'll send a verification code to your email
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`appearance-none relative block w-full px-4 py-3 border 
                ${error ? "border-red-500" : "border-gray-300"} 
                placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none 
                focus:ring-2 ${
                  error ? "focus:ring-red-500" : "focus:ring-blue-500"
                } 
                focus:z-10 text-sm`}
              required
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent 
                text-sm font-medium rounded-md text-white 
                ${
                  loading
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                } 
                transition-colors duration-200`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Checking...
                </span>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailEntry;
