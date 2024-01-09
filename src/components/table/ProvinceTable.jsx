import { Edit, Trash, View } from "lucide-react";
import { ProvinceDetail } from ".././ProvinceDetail";
import { useState } from "react";

export const ProvinceTable = ({
  data,
  onDelete,
  provinces,
  selectedItem,
  districts,
  communes,
  villages,
}) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const provinceDetailData = (id) => {
    let data = {};
    setIsShowModal(true);
    const foundProvince = provinces.find((pro) => pro.id === id);
    if (foundProvince) {
      const foundAllDistrict = districts
        .filter((dis) => dis.province_id === foundProvince.id)
        .map((dis) => {
          const foundAllCommune = communes
            .filter((com) => com.district_id === dis.id)
            .map((com) => {
              const foundAllVillage = villages.filter(
                (vil) => vil.commune_id === com.id
              );

              return {
                ...com,
                villages: foundAllVillage,
              };
            });

          return {
            ...dis,
            communes: foundAllCommune,
          };
        });

      data = {
        ...foundProvince,
        districts: foundAllDistrict,
      };

      setModalData(data);
    }
  };

  return (
    <div className="flex justify-center mt-10 border-b-2">
      {isShowModal && (
        <ProvinceDetail data={modalData} setIsShowModal={setIsShowModal} />
      )}

      <div className="flex flex-col items-center justify-center w-full bg-white shadow-md rounded-xl ">
        <h1 className=" text-neutral-600 text-center text-3xl font-bold py-4">
          Province list
        </h1>
        <table className=" w-full overflow-scroll ">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700 border-t">
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
                        onClick={() => provinceDetailData(d.id)}
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
              <tr className="border border-b items-center justify-center text-center text-3xl">
                <td colSpan="6" className="py-4">
                  No provinces data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
