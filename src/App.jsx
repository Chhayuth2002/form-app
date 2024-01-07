import { useState } from "react";
import { CommuneForm } from "./components/CommuneForm";
import { DistrictForm } from "./components/DistrictForm";
import { ProvinceForm } from "./components/ProvinceForm";
import { Table } from "./components/Table";
import uuid from "react-uuid";

function App() {
  const [data, setData] = useState([]);

  const [provinces, setProvince] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [communes, setCommune] = useState([]);

  const onSaveProvince = (params) => {
    const newProvince = {
      id: uuid(),
      ...params,
    };

    setProvince([...provinces, newProvince]);
    // setTempData(newProvince);
  };

  const onSaveDistrict = (params) => {
    const newDistrict = {
      id: uuid(),
      ...params,
    };

    setDistrict([...districts, newDistrict]);
  };

  // console.log(provinces);
  const onSaveCommune = (params) => {
    const newCommune = {
      id: uuid(),
      ...params,
    };

    setCommune([...communes, newCommune]);
  };

  // console.log("province", provinces);
  // console.log("district", districts);
  // console.log("commune", communes);

  return (
    <div className="max-h-screen bg-slate-200">
      <div className="container mx-auto">
        <ProvinceForm onSave={onSaveProvince} />
        <DistrictForm provinces={provinces} onSave={onSaveDistrict} />
        <CommuneForm onSave={onSaveCommune} districts={districts} />
        <Table
          provinces={provinces}
          districts={districts}
          communes={communes}
        />
      </div>
    </div>
  );
}

export default App;
