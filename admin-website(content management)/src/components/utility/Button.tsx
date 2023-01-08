type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button aria-label="button" type={type} onClick={onClick} className="flex w-full gap-3 items-center justify-center bg-[#0095F6] hover:bg-[#1C77FF] text-white rounded-md transition-all duration-300 py-2 px-3 ">
      {children}
    </button>
  );
};

export default Button;
