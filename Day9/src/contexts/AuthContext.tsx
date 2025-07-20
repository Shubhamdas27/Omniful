import React, { createContext, useContext, useState } from 'react';

type UserRole = 'student' | 'teacher' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Auto-login for demo purposes
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Shubham Das',
    email: 'shubham@college.edu',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const indianNames = [
      'Shubham Das',
      'Ritesh Sharma', 
      'Akshay Nema',
      'Yuvraj Yadav',
      'Priya Singh',
      'Rahul Gupta',
      'Anjali Patel',
      'Vikash Kumar'
    ];
    
    const randomName = indianNames[Math.floor(Math.random() * indianNames.length)];
    
    setUser({
      id: '1',
      name: randomName,
      email,
      role,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};