import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-16">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 rounded mt-2"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
