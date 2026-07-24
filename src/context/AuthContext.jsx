import { createContext, useContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

// the one fixed super admin account for this demo app
const SUPER_ADMIN_USERNAME = "Admin123";
const SUPER_ADMIN_PASSWORD = "123456";

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("authUser", null);
  const [users, setUsers] = useLocalStorage("users", []);

  const register = useCallback(
    (username, password, role) => {
      if (!username || !password) {
        return { success: false, message: "Username and password are required" };
      }
      if (username === SUPER_ADMIN_USERNAME) {
        return { success: false, message: "That username is reserved" };
      }
      const alreadyExists = users.some((u) => u.username === username);
      if (alreadyExists) {
        return { success: false, message: "Username already taken" };
      }
      const newUser = { username, password, role: role || "User" };
      setUsers([...users, newUser]);
      return { success: true, message: "Account created, please log in" };
    },
    [users, setUsers]
  );

  const login = useCallback(
    (username, password) => {
      if (username === SUPER_ADMIN_USERNAME && password === SUPER_ADMIN_PASSWORD) {
        setUser({ username, role: "Super Admin" });
        return { success: true };
      }
      const found = users.find(
        (u) => u.username === username && u.password === password
      );
      if (found) {
        setUser({ username: found.username, role: found.role });
        return { success: true };
      }
      return { success: false, message: "Invalid username or password" };
    },
    [users, setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
