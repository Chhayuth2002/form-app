import { X } from "lucide-react";

export const ViewDetail = ({ data, setIsViewing }) => {
  return (
    <div className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
      <div className="relative p-4 w-full max-h-6xl max-w-6xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            onClick={() => setIsViewing(false)}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          >
            <X />
          </button>

          <div className="flex flex-row p-10">
            <div className="p-5 w-1/4 border-r-2">
              <div className="mb-2 ">Province</div>
            </div>
            <div className="p-5 w-1/4">
              <div className="mb-2 ">District</div>
            </div>
            <div className="p-5 w-1/4">
              <div className="mb-2 ">Commune</div>
            </div>
            <div className="p-5 w-1/4">
              <div className="mb-2 ">Village</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
