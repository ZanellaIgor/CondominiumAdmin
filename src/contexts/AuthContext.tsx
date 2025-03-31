import { EnumRoles } from "@src/utils/enum/role.enum";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type IUser = {
  email: string;
  name: string;
  userId: number;
  role: EnumRoles;
  condominiumIds: number[];
  apartmentIds: number[];
};

interface AuthContextType {
  isAuthenticated: boolean;
  userInfo?: IUser;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Novo estado
  const navigate = useNavigate();

  const login = useCallback(
    async (token: string) => {
      try {
        const ttlDays = Number(import.meta.env.VITE_COOKIE_JWT_TTL);
        const decodedUser = jwtDecode<IUser>(token);
        Cookies.set("token", token, {
          expires: ttlDays,
        });
        setIsAuthenticated(true);
        setUserInfo(decodedUser);
        navigate("/");
      } catch (error) {
        console.error("Erro ao processar login:", error);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUserInfo(undefined);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedUser = jwtDecode<IUser>(token);
        setIsAuthenticated(true);
        setUserInfo(decodedUser);
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        logout();
      }
    }

    setIsLoading(false);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userInfo, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
