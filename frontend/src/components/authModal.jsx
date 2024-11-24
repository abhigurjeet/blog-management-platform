import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // For success messages

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setError("");
      setMessage("");
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const endpoint = isSignUp ? "/create-admin" : "/login";
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}${endpoint}`,
        { email, password },
      );
      setLoading(false);
      setMessage(response.data.message);
      const token = response.data.token;
      localStorage.setItem("authToken", token);

      onSuccess(token);

      if (!isSignUp) {
        alert("Sign-in successful!");
      }

      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isSignUp ? "Create Admin" : "Admin Login"}
        </h2>

        {message && <p className="text-green-500 mb-3">{message}</p>}
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-200 text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-200 text-black"
            required
          />
          <button
            type="submit"
            className={`w-full py-3 rounded ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-700"
            }`}
            disabled={loading}
          >
            {loading
              ? isSignUp
                ? "Creating..."
                : "Logging in..."
              : isSignUp
                ? "Create Admin"
                : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 underline"
          >
            {isSignUp ? "Login" : "Create Admin"}
          </button>
        </p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AuthModal;
