interface ButtonProps {
  onClick?: () => void;
  value?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function Button({
  onClick,
  value,
  className,
  disabled,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
      disabled={disabled}
    >
      {children}
      {value}
    </button>
  );
}
