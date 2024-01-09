import { Edit, Trash, View } from "lucide-react";

export const Table = ({
  data,
  onDelete,
  selectedItem,
  selectedProvinceData,
}) => {
  return (
    <div className="flex justify-center my-5 border-b-2">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className=" text-neutral-600 text-center text-3xl font-bold pb-2">
          Province list
        </h1>
        <table className=" w-full bg-white shadow-md rounded-xl overflow-scroll mb-10">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Id </th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Total Districts</th>
              <th className="py-3 px-4 text-left">Total Communes</th>
              <th className="py-3 px-4 text-left">Total Villages</th>
              <th className="py-3 px-4 text-left w-40">Actions</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {data?.length ? (
              <>
                {data?.map((d) => (
                  <tr key={d.id} className="border border-b">
                    <td className="px-3 py-4 ">{d.id}</td>
                    <td className="px-3 py-4">
                      {d.latin} / {d.khmer}
                    </td>
                    <td className="px-3 py-4">{d.total_districts}</td>
                    <td className="px-3 py-4">{d.total_communes}</td>
                    <td className="px-3 py-4">{d.total_villages}</td>
                    <td className="px-3 py-4">
                      <button
                        onClick={() => selectedProvinceData(d.id)}
                        className="mr-2 hover:underline "
                      >
                        <View />
                      </button>
                      <button
                        onClick={() => selectedItem(d.id, "provinces")}
                        className="mx-2 hover:underline "
                      >
                        <Edit />
                      </button>

                      <button
                        onClick={() => onDelete(d.id, "provinces")}
                        className="ml-2 hover:underline text-rose-500"
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className="border border-b text-center text-5xl">
                <td colSpan="5" className="py-4">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
