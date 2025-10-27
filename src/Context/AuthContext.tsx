import React, { createContext, useContext, useState } from "react";

export type User = {
  name: string;
  email: string;
};

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
const users = {
  "admin": {
    name: "Administrador",
    email: "admin@example.com",
    password: "admin",
  },
  "user": {
    name: "Usuario Normal",
    email: "user@example.com",
    password: "user",
  },
}
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(email: string, password: string): boolean {
    // 1. Buscar el usuario en la lista
    const foundUser = Object.values(users).find(
      u => u.email === email && u.password === password
    );
  
    // 2. Si encontraste el usuario, guardarlo
    if (foundUser) {
      setUser({ name: foundUser.name, email: foundUser.email });
      setIsAuthenticated(true);
      return true; // Login exitoso
    }
    // 3. Si no lo encontraste, retornar false (login fallido)
    return false;
  }

  function register(name: string, email: string, password: string){
    // Aquí iría la lógica de registro real
    setUser({ name, email });
  }

  function logout(){
    setUser(null);
    setIsAuthenticated(false);
  }

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
}