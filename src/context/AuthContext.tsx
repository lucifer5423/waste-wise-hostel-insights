
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  updatePassword: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("12345");
  const { toast } = useToast();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedPassword = localStorage.getItem('userPassword');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    
    if (storedPassword) {
      setCurrentPassword(storedPassword);
    } else {
      localStorage.setItem('userPassword', currentPassword);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Check credentials
    if (username === 'Admin' && password === currentPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      toast({
        title: "Login successful",
        description: "Welcome back, Admin!",
      });
      return true;
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged out",
      description: "You have successfully logged out",
    });
  };
  
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    if (oldPassword === currentPassword) {
      setCurrentPassword(newPassword);
      localStorage.setItem('userPassword', newPassword);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
