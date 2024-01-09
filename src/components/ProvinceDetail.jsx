import { X } from "lucide-react";

export const ProvinceDetail = ({ data, setIsShowModal }) => {
  return (
    <div className=" bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
      <div className="relative p-4 w-full max-h-6xl max-w-6xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            onClick={() => setIsShowModal(false)}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          >
            <X />
          </button>

          <div className="flex flex-row p-5">
            <div className="p-5 w-full ">
              <div className="mb-2 text-3xl text-center font-semibold border-b-2 ">
                Province: {data.latin} / {data.khmer}
              </div>
              <div className="grid grid-cols-2">
                {data?.districts?.map((district) => (
                  <div className="p-5 " key={district.id}>
                    <div className="mb-2 text-2xl border-b-2">
                      District: {district.latin} / {district.khmer}
                    </div>
                    {district?.communes?.map((commune) => (
                      <div key={commune.id}>
                        <div className="ml-3 mt-2 text-xl border-b-2">
                          Commune: {commune.latin} / {commune.khmer}
                        </div>
                        {commune?.villages?.map((village) => (
                          <div className="ml-5 mt-2 " key={village.id}>
                            Village: {village.latin} / {village.khmer}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="p-5 w-1/4">
              <div className="mb-2 ">Commune</div>
            </div>
            <div className="p-5 w-1/4">
              <div className="mb-2 ">Village</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
