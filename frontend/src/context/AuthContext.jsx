import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const testUsers = [
  {
    id: 1,
    name: "student",
    email: "user@test.com",
    password: "password",
    role: "user",
  },
  {
    id: 2,
    name: "admin",
    email: "admin@test.com",
    password: "password",
    role: "admin",
  },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return null;
  });

  function login(email, password) {
    const user = testUsers.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) {
      return null;
    }
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }

  function register(name, email, password) {
    const newUser = {
      id: testUsers.length + 1,
      name,
      email,
      password,
      role: "user",
    };
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return newUser;
  }
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }
  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
