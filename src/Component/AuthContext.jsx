import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("synapse_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("synapse_user");
      }
    }
  }, []);

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem("synapse_users")) || [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem("synapse_users", JSON.stringify(users));
  }

  function setSession(userData) {
    const { password, ...safeUser } = userData;
    setUser(safeUser);
    localStorage.setItem("synapse_user", JSON.stringify(safeUser));
  }


  function register({ firstName, lastName, email, password }) {
    const users = getUsers();
    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (alreadyExists) {
      throw new Error("An account with this email already exists. Try signing in instead.");
    }
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      name: `${firstName} ${lastName}`.trim(),
    };
    users.push(newUser);
    saveUsers(users);
    setSession(newUser);
  }

  function login({ email, password }) {
    const users = getUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      throw new Error("No account found with this email. Create one instead.");
    }
    if (found.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }
    setSession(found);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("synapse_user");
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}