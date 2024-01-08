export const Button = ({ children, onClick, isDisable }) => {
  return (
    <button
      disabled={isDisable}
      onClick={onClick}
      className=" bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
    >
      {children}
    </button>
  );
};
