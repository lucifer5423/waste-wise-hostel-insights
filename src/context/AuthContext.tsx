
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type UserRole = 'admin' | 'student';

type UserInfo = {
  username: string;
  role: UserRole;
};

type AuthContextType = {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userInfo: null,
  login: async () => false,
  logout: () => {},
  updatePassword: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [adminPassword, setAdminPassword] = useState<string>("12345");
  const { toast } = useToast();

  // Student credentials
  const studentCredentials = {
    username: "student",
    password: "student123"
  };

  // Check if user is already logged in on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('adminPassword');
    
    if (authStatus === 'true' && storedRole && storedUsername) {
      setIsAuthenticated(true);
      setUserInfo({
        username: storedUsername,
        role: storedRole as UserRole
      });
    }
    
    if (storedPassword) {
      setAdminPassword(storedPassword);
    } else {
      localStorage.setItem('adminPassword', adminPassword);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Check admin credentials
    if (username === 'Admin' && password === adminPassword) {
      setIsAuthenticated(true);
      setUserInfo({
        username: 'Admin',
        role: 'admin'
      });
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('username', 'Admin');
      toast({
        title: "Login successful",
        description: "Welcome back, Admin!",
      });
      return true;
    } 
    // Check student credentials
    else if (username === studentCredentials.username && password === studentCredentials.password) {
      setIsAuthenticated(true);
      setUserInfo({
        username: 'student',
        role: 'student'
      });
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('username', 'student');
      toast({
        title: "Login successful",
        description: "Welcome, Student!",
      });
      return true;
    } 
    else {
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
    setUserInfo(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    toast({
      title: "Logged out",
      description: "You have successfully logged out",
    });
  };
  
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    if (userInfo?.role === 'admin' && oldPassword === adminPassword) {
      setAdminPassword(newPassword);
      localStorage.setItem('adminPassword', newPassword);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
