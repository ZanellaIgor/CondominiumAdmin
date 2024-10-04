import { EnumRoles } from '@src/utils/enum/role.enum';
import { decodeJwt } from '@src/utils/functions/decodeJWT';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  email: string;
  id: number;
  role: EnumRoles;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const handleTokenDecode = async () => {
        try {
          const decodedValues = await decodeJwt(token);
          if (decodedValues) {
            setIsAuthenticated(true);
            setUserInfo(decodedValues);
          } else {
            throw new Error('Token inválido');
          }
        } catch (error) {
          setIsAuthenticated(false);
          setUserInfo(undefined);
          localStorage.removeItem('token');
          navigate('/login');
        }
      };

      handleTokenDecode();
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
