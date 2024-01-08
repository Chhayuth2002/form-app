import { useEffect, useState } from "react";
import { ProvinceForm } from "./components/ProvinceForm";
import { DistrictForm } from "./components/DistrictForm";
import { CommuneForm } from "./components/CommuneForm";
import { VillageForm } from "./components/VillageForm";
import { Table } from "./components/Table";
import provincesData from "./data/provinces";

import uuid from "react-uuid";

function App() {
  const [data, setData] = useState([]);
  const [provinces, setProvince] = useState(provincesData);
  const [districts, setDistrict] = useState([]);
  const [communes, setCommune] = useState([]);
  const [villages, setVillage] = useState([]);

  const [selected, setSelected] = useState({});

  useEffect(() => {
    const result = provinces.map((pro) => {
      const totalDistricts = districts.filter(
        (dis) => dis.province_id === pro.id
      );

      const totalCommunes = communes.filter((com) =>
        totalDistricts.find((dis) => dis.id === com.district_id)
      );

      const totalVillage = villages.filter((vil) =>
        totalCommunes.find((com) => com.id === vil.commune_id)
      );

      return {
        ...pro,
        total_districts: totalDistricts.length,
        total_communes: totalCommunes.length,
        total_villages: totalVillage.length,
      };
    });

    setData(result);
  }, [provinces, districts, communes, villages]);

  // console.log("Province: ", provinces);
  // console.log("District: ", districts);
  // console.log("Commune: ", communes);
  // console.log("Village: ", villages);

  const onSaveProvince = (params) => {
    const newProvince = {
      id: uuid(),
      ...params,
    };

    setProvince(provinces.concat(newProvince));
  };

  const onDelete = (id) => {
    const districtToDelete = districts.filter((dis) => dis.province_id === id);
    const communeToDelete = communes.filter((com) =>
      districtToDelete.some((dis) => dis.id === com.district_id)
    );
    const villageToDelete = villages.fill((vil) =>
      communeToDelete.some((com) => com.id === vil.commune_id)
    );

    setProvince(provinces.filter((pro) => pro.id !== id));
    setDistrict(districts.filter((dis) => !districtToDelete.includes(dis)));
    setCommune(communes.filter((com) => !communeToDelete.includes(com)));
    setVillage(villages.filter((vil) => !villageToDelete.includes(vil)));
  };

  const onEdit = (params) => {
    const updateProvince = provinces.map((pro) =>
      pro.id === params.id ? { ...pro, ...params } : pro
    );

    setProvince(updateProvince);
  };

  const selectedProvince = (id) => {
    const findProvince = provinces.find((pro) => pro.id === id);

    setSelected(findProvince);
  };

  const onSaveDistrict = (params) => {
    const newDistrict = {
      id: uuid(),
      ...params,
    };

    setDistrict(districts.concat(newDistrict));
  };

  const onSaveCommune = (params) => {
    const newCommune = {
      id: uuid(),
      ...params,
    };

    setCommune(communes.concat(newCommune));
  };

  const onSaveVillage = (params) => {
    const newVillage = {
      id: uuid(),
      ...params,
    };

    setVillage(villages.concat(newVillage));
  };

  return (
    <div className="max-h-screen">
      <div className="container mx-auto">
        <ProvinceForm
          onSave={onSaveProvince}
          onEdit={onEdit}
          value={selected}
          setValue={setSelected}
        />
        <DistrictForm provincesData={provinces} onSave={onSaveDistrict} />
        <CommuneForm
          provincesData={provinces}
          districtData={districts}
          onSave={onSaveCommune}
        />
        <VillageForm
          provincesData={provinces}
          districtsData={districts}
          communesData={communes}
          onSave={onSaveVillage}
        />
        <Table
          selectedProvince={selectedProvince}
          onDelete={onDelete}
          data={data}
          selected={selected}
        />
      </div>
    </div>
  );
}

export default App;
