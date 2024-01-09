import ctx from "classname";

export const Button = ({ children, onClick, isDisable, className }) => {
  return (
    <button
      disabled={isDisable}
      onClick={onClick}
      className={ctx(
        "bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400",
        className
      )}
    >
      {children}
    </button>
  );
};
