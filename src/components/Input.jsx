export const TextIinput = ({ type = "text", value, label, name, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium ">{label}</label>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
  );
};

export const Dropdown = ({ label, data, name, onChange, placeHolder }) => {
  return (
    <>
      <label className=" mb-2 text-sm font-medium">{label}</label>
      <select
        onChange={onChange}
        name={name}
        className="bg-gray-50 border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      >
        <option value="">{placeHolder}</option>
        {data?.map((pro) => (
          <option key={pro.id} value={pro.id}>
            {pro.latin} / {pro.khmer}
          </option>
        ))}
      </select>
    </>
  );
};
