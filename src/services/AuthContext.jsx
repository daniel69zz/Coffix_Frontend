import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // const API_LOGIN = "http://localhost:8080/auth/login";
  const API_LOGIN = "https://proyecto-sis-info-backend.onrender.com/auth/login";

  const login = async (user, password) => {
    const resp = await fetch(API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    if (!resp.ok) throw new Error("Credenciales inválidas");

    const data = await resp.json();
    // data = { id_usuario, password, rol, usuario }

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("rol", data.rol);

    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("rol");
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
