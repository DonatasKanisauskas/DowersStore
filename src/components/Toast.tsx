import { useEffect } from "react";

interface ToastProps {
  /** Time in seconds */
  time: number;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const Toast: React.FC<ToastProps> = ({ time, error, setError }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      ClosePopUp();
    }, 1000 * time);

    return () => clearTimeout(timeoutId);
  }, []);

  const ClosePopUp = () => {
    setError(null);
  };

  return (
    <div>
      <p>{error}</p>
      <button onClick={ClosePopUp}>x</button>
    </div>
  );
};

export default Toast;
