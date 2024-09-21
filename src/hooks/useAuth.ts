import { AuthContext } from '@src/contexts/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'Contexto de autenticação deve ser usado dentro do AuthProvider'
    );
  }
  return context;
};
