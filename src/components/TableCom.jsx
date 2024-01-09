import { Edit, Trash } from "lucide-react";

export const TableCom = ({ data, onDelete, selectedItem, title, entity }) => {
  return (
    <div className="flex justify-center my-5  border-b-2">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className=" text-neutral-600 text-center text-3xl font-bold pb-2">
          {title}
        </h1>
        <table className="  w-full bg-white shadow-md rounded-xl overflow-scroll mb-10">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Id </th>
              <th className="py-3 px-4 text-left">Khmer</th>
              <th className="py-3 px-4 text-left">Latin</th>
              <th className="py-3 px-4 text-left w-40">Actions</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {data?.length ? (
              <>
                {data?.map((d) => (
                  <tr key={d.id} className="border border-b">
                    <td className="px-3 py-4 ">{d.id}</td>
                    <td className="px-3 py-4">{d.khmer}</td>
                    <td className="px-3 py-4">{d.latin}</td>
                    <td className="px-3 py-4">
                      <button
                        onClick={() => selectedItem(d.id, entity)}
                        className="mx-2 hover:underline "
                      >
                        <Edit />
                      </button>

                      <button
                        onClick={() => onDelete(d.id, entity)}
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
