interface ButtonProps {
  onClick?: () => void;
  value?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  fontColor?: string;
}

export default function Button({
  onClick,
  value,
  className,
  disabled,
  children,
  fontColor = "text-white",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${fontColor} ${className} bg-blue-700 enabled:hover:bg-blue-800 disabled:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
      disabled={disabled}
    >
      {children}
      {value}
    </button>
  );
}
