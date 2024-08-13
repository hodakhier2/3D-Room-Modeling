import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isLogged, setIsLogged] = useState("false");

  const login = (id) => {
    setUserId(id);
    setIsLogged("true");
  };

  const logout = () => {
    setUserId(null);
    setIsLogged("false");
  };

  return (
    <AuthContext.Provider value={{ userId, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
