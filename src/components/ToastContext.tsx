import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Toast from "./Toast";

interface Toast {
  id: number;
  status: string;
  message: string;
}

interface ToastContextType {
  createToast: (status: string, message: string) => number;
  updateToast: (id: number, status: string, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToast = (status: string, message: string) => {
    const id = Math.floor(Math.random() * 10000000000);
    setToasts((prevToasts) => {
      const newToast: Toast = {
        id: id,
        status,
        message,
      };
      return [...prevToasts, newToast];
    });
    return id;
  };

  const updateToast = (id: number, status: string, message: string) => {
    setToasts((prevToasts) => prevToasts.map((toast) => (toast.id === id ? { ...toast, status, message } : toast)));
  };

  const removeToast = (id: number) => {
    console.log(id);
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    console.log(toasts);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ createToast, updateToast }}>
      <div className="fixed top-[80px] flex flex-col px-1 sm:right-5 sm:w-[290px] w-full items-center">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} removeToast={() => removeToast(toast.id)} />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};
