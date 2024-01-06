export const Table = ({ data }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs  uppercase bg-gray-50 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Total Districts
            </th>
            <th scope="col" className="px-6 py-3">
              Total Communes
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => {
            <tr key={d.id} className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap"
              >
                {d.id}
              </th>
              <td className="px-6 py-4">{d.name}</td>
              <td className="px-6 py-4">{d.districs.length}</td>
              <td className="px-6 py-4">{d.districs.communes.length}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};
