import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (user, password) => {
    console.log("hola");
    const resp = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    });

    if (!resp.ok) {
      throw new Error("Credenciales inválidas");
    }

    const data = await resp.json();

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));

    console.log(data);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // aquí podrías llamar a /auth/logout si tu backend tuviera uno
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
