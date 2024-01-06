import { useState } from "react";
import { CommuneForm } from "./components/CommuneForm";
import { DistrictForm } from "./components/DistrictForm";
import { ProvinceForm } from "./components/ProvinceForm";
import { Table } from "./components/Table";
import uuid from "react-uuid";

function App() {
  const [date, setData] = useState([]);

  const [provinces, setProvince] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [communes, setCommune] = useState([]);

  const [tempData, setTempData] = useState({
    id: "",
    latin: "",
    khmer: "",
    districts: [
      {
        id: "",
        latin: "",
        khmer: "",
        province_id: "",
        communes: [
          {
            id: "",
            latin: "",
            khmer: "",
            province_id: "",
          },
        ],
      },
    ],
  });

  const onSaveProvince = (params) => {
    const newProvince = {
      id: uuid(),
      ...params,
    };

    setProvince([...provinces, newProvince]);
    setTempData(newProvince);
  };

  const onSaveDistrict = (params) => {
    const newDistrict = {
      id: uuid(),
      ...params,
    };

    setDistrict([...districts, newDistrict]);

    // const findPro = provinces.find((pro) => {
    //   if (pro.id === tempData.id) {
    //     setTempData({ ...pro });
    //   }
    // });

    // setTempData(findPro);
  };

  // console.log(provinces);
  const onSaveCommune = (params) => {
    const newCommune = {
      id: uuid(),
      ...params,
    };

    setCommune([...communes, newCommune]);
  };

  console.log("province", provinces);
  console.log("district", districts);
  console.log("commune", communes);

  return (
    <div className=" min-h-full bg-slate-200">
      <div className="container mx-auto">
        <ProvinceForm onSave={onSaveProvince} />
        <DistrictForm provinces={provinces} onSave={onSaveDistrict} />
        <CommuneForm onSave={onSaveCommune} districts={districts} />
        <Table />
      </div>
    </div>
  );
}

export default App;
