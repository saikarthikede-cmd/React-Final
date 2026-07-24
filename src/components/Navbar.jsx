import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between">
      <span className="font-bold text-lg">AdTech Campaign Manager</span>
      {user && (
        <div className="flex items-center gap-3 text-sm">
          <span>
            {user.username} <span className="opacity-80">{user.role}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
