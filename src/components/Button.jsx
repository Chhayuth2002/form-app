export const Button = ({ children, onClick }) => {
  return (
    <div className="">
      <div
        onClick={onClick}
        className="rounded py-1 px-3 text-xl hover:bg-slate-500 bg-slate-800 text-white cursor-pointer"
      >
        {children}
      </div>
    </div>
  );
};
