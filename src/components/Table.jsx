import { useMemo } from "react";

export const Table = ({ provinces, districts, communes }) => {
  const data = useMemo(
    () =>
      provinces.map((pro) => {
        const totalDis = districts.filter((dis) => dis.province_id === pro.id);
        const totalCom = communes.filter((com) =>
          totalDis.find((dis) => dis.id === com.district_id)
        );

        return {
          ...pro,
          total_districts: totalDis.length,
          total_communes: totalCom.length,
        };
      }),
    [provinces, districts, communes]
  );

  // console.log("data: ", data);

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
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id} className="bg-white border-b  text-xl">
              <th className="px-6 py-4 font-medium  whitespace-nowrap">
                {d.id}
              </th>
              <td className="px-6 py-4">
                {d.latin}/{d.khmer}
              </td>
              <td className="px-6 py-4">{d.total_districts}</td>
              <td className="px-6 py-4">{d.total_communes}</td>
              <td className="px-6 py-4">
                <button className="mr-2 hover:underline text-blue-300">
                  Edit
                </button>
                /
                <button className="ml-2 hover:underline text-rose-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
