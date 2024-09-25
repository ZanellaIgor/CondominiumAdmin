import { decryptData } from '@src/utils/functions/crypto';
import { decodeJwt } from '@src/utils/functions/decodeJWT';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  email: string;
  id: number;
  isAdmin: boolean;
  condominiumIds: number[];
  apartmentIds: number[];
};

interface AuthContextType {
  isAuthenticated: boolean;
  userInfo?: User;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const data = JSON.parse(token);
      decryptData({
        encryptedData: data.data,
        keyBase64: data.key,
        ivBase64: data.iv,
        authTagBase64: data.authTag,
      }).then((values) => {
        setIsAuthenticated(true);
        const decodeValues = decodeJwt(values);
        setUserInfo(decodeValues);
      });
    } else {
      setIsAuthenticated(false);
      setUserInfo(undefined);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userInfo, setIsAuthenticated, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
