export const TextIinput = ({
  type = "text",
  value,
  label,
  name,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium ">{label}</label>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
      {error && (
        <span className=" flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {error}
        </span>
      )}
    </div>
  );
};

export const Dropdown = ({
  label,
  data,
  name,
  onChange,
  placeHolder,
  error,
}) => {
  return (
    <>
      <div className="mb-4 relative">
        <div className="relative">
          <label className=" block mb-2 text-sm font-medium">{label}</label>
          <select
            onChange={onChange}
            name={name}
            onSelect={onchange}
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            {data?.length > 0 ? (
              <>
                <option value="">{placeHolder}</option>
                {data?.map((pro) => (
                  <option key={pro.id} value={pro.id}>
                    {pro.latin} / {pro.khmer}
                  </option>
                ))}
              </>
            ) : (
              <option value="">No {label}</option>
            )}
          </select>
        </div>
        {error && (
          <span className=" flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {error}
          </span>
        )}
      </div>
    </>
  );
};
