import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, { isCancel } from 'axios';
import AvatarPlaceholder from "../Reqs_Johao/Resources/Avatar.jpeg";

interface AdminData {
  nombre: string;
  foto: string | null;
}

interface AdminContextType {
  admin: AdminData;
  isLoading: boolean;
  refreshAdmin: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminData>({
    nombre: "Administrador",
    foto: AvatarPlaceholder
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdmin = async (signal?: AbortSignal) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/johao/usuarios/admin`, { signal });
      const fotoPath = res.data.foto
        ? (res.data.foto.startsWith('/') ? res.data.foto : `/imagenes/usuario/${res.data.foto}`)
        : null;

      setAdmin({
        nombre: res.data.nombre,
        foto: fotoPath ? `${import.meta.env.VITE_BACKEND_URL}${fotoPath}` : AvatarPlaceholder
      });
    } catch (error) {
      if (isCancel(error)) return;
      console.error("Error fetching admin profile in context:", error);
      setAdmin({
        nombre: "Administrador",
        foto: AvatarPlaceholder
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchAdmin(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, isLoading, refreshAdmin: fetchAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
