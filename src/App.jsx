import { useMemo, useState } from "react";
import { ProvinceForm } from "./components/ProvinceForm";
import { DistrictForm } from "./components/DistrictForm";
import { CommuneForm } from "./components/CommuneForm";
import { VillageForm } from "./components/VillageForm";
import { Table } from "./components/Table";
import provincesData from "./data/provinces";

import uuid from "react-uuid";
import { ViewDetail } from "./components/ViewDetail";
import { TableCom } from "./components/TableCom";
import districtData from "./data/districts";
import commuenData from "./data/communes";
import villageData from "./data/villages";

function App() {
  const [data, setData] = useState([]);
  const [provinces, setProvince] = useState(provincesData);
  const [districts, setDistrict] = useState(districtData);
  const [communes, setCommune] = useState(commuenData);
  const [villages, setVillage] = useState(villageData);

  const [selectedProvince, setSelectedProvince] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedCommune, setSelectedCOmmune] = useState({});
  const [selectedVillage, setSelectedVillage] = useState({});

  const [isViewing, setIsViewing] = useState(false);

  useMemo(() => {
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

  // Delete
  const onDelete = (id, table) => {
    if (table === "provinces") {
      const districtToDelete = districts.filter(
        (dis) => dis.province_id === id
      );
      const communeToDelete = communes.filter((com) =>
        districtToDelete.some((dis) => dis.id === com.district_id)
      );
      const villageToDelete = villages.filter((vil) =>
        communeToDelete.some((com) => com.id === vil.commune_id)
      );

      setProvince(provinces.filter((pro) => pro.id !== id));
      setDistrict(districts.filter((dis) => !districtToDelete.includes(dis)));
      setCommune(communes.filter((com) => !communeToDelete.includes(com)));
      setVillage(villages.filter((vil) => !villageToDelete.includes(vil)));
      //
    } else if (table === "districts") {
      //
      const communeToDelete = communes.filter((com) => com.district_id === id);
      const villageToDelete = villages.filter((vil) =>
        communeToDelete.some((com) => com.id === vil.commune_id)
      );

      setDistrict(districts.filter((dis) => dis.id !== id));
      setCommune(communes.filter((com) => !communeToDelete.includes(com)));
      setVillage(villages.filter((vil) => !villageToDelete.includes(vil)));
    } else if (table === "communes") {
      const villageToDelete = villages.filter((vil) => vil.commune_id === id);

      setCommune(communes.filter((com) => com.id !== id));
      setVillage(villages.filter((vil) => !villageToDelete.includes(vil)));
    } else if (table === "villages") {
      setVillage(villages.filter((vil) => vil.id !== id));
    }
  };

  // Edit
  const onEdit = (entity, params) => {
    switch (entity) {
      case "provinces":
        setProvince(
          provinces.map((pro) =>
            pro.id === params.id ? { ...pro, ...params } : pro
          )
        );
        break;
      case "districts":
        setDistrict(
          districts.map((dis) =>
            dis.id === params.id ? { ...dis, ...params } : dis
          )
        );
        break;
      case "communes":
        setCommune(
          communes.map((com) =>
            com.id === params.id ? { ...com, ...params } : com
          )
        );
        break;
      case "villages":
        setVillage(
          villages.map((vil) =>
            vil.id === params.id ? { ...vil, ...params } : vil
          )
        );
        break;
      default:
        break;
    }
  };

  // Add
  const onSave = (entity, params) => {
    const newData = {
      id: uuid(),
      ...params,
    };

    switch (entity) {
      case "provinces":
        setProvince(provinces.concat(newData));
        break;
      case "districts":
        setDistrict(districts.concat(newData));
        break;
      case "communes":
        setCommune(communes.concat(newData));
        break;
      case "villages":
        setVillage(villages.concat(newData));
        break;
      default:
        break;
    }
  };

  const seletectItem = (id, entity) => {
    if (entity === "provinces") {
      setSelectedProvince(provinces.find((pro) => pro.id === id));
    } else if (entity === "districts") {
      const findDistrict = districts.find((dis) => dis.id === id);
      const findProvince = provinces.find(
        (pro) => pro.id === findDistrict.province_id
      ).id;

      setSelectedDistrict({
        ...findDistrict,
        province_id: findProvince,
      });
    } else if (entity === "communes") {
      const findCommune = communes.find((com) => com.id === id);
      const findDistrict = districts.find(
        (dis) => dis.id === findCommune.district_id
      );

      const findProvince = provinces.find(
        (pro) => pro.id === findDistrict.province_id
      ).id;

      setSelectedCOmmune({
        ...findCommune,
        district_id: findDistrict.id,
        province_id: findProvince,
      });
    } else if (entity === "villages") {
      const findVillage = villages.find((vil) => vil.id === id);
      const findCommune = communes.find(
        (com) => com.id === findVillage.commune_id
      );
      const findDistrict = districts.find(
        (dis) => dis.id === findCommune.district_id
      );

      const findProvince = provinces.find(
        (pro) => pro.id === findDistrict.province_id
      ).id;

      setSelectedVillage({
        ...findVillage,
        commune_id: findCommune.id,
        district_id: findDistrict.id,
        province_id: findProvince,
      });
    }
  };

  console.log(communes);

  // useMemo(() => {
  //   let data = {};
  //   const foundProvince = provinces.find((pro) => pro.id === selected.id);
  //   if (foundProvince) {
  //     const foundDistrict = districts
  //       .filter((dis) => dis.province_id === foundProvince.id)
  //       .map((dis) => {
  //         const foundCommune = communes
  //           .filter((com) => com.district_id === dis.id)
  //           .map((com) => {
  //             const foundVillage = villages.filter(
  //               (vil) => vil.commune_id === com.id
  //             );

  //             return {
  //               ...com,
  //               villages: foundVillage,
  //             };
  //           });

  //         return {
  //           ...dis,
  //           communes: foundCommune,
  //         };
  //       });

  //     data = {
  //       ...foundProvince,
  //       districts: foundDistrict,
  //     };

  //     setEditData(data);
  //   }
  // }, [selected, provinces, districts, communes, villages]);

  // console.log("Province: ", provinces);
  // console.log("District: ", districts);
  // console.log("Commune: ", communes);
  // console.log("Village: ", villages);

  return (
    <div className="max-h-screen">
      <div className="container mx-auto flex flex-row">
        <div className="mr-10">
          <ProvinceForm
            setValue={setSelectedProvince}
            value={selectedProvince}
            onSave={onSave}
            onEdit={onEdit}
          />
          <DistrictForm
            provincesData={provinces}
            onSave={onSave}
            onEdit={onEdit}
            setValue={setSelectedDistrict}
            value={selectedDistrict}
          />
          <CommuneForm
            provincesData={provinces}
            districtData={districts}
            onSave={onSave}
            onEdit={onEdit}
            setValue={setSelectedCOmmune}
            value={selectedCommune}
          />
          <VillageForm
            provincesData={provinces}
            districtsData={districts}
            communesData={communes}
            onSave={onSave}
            onEdit={onEdit}
            setValue={setSelectedVillage}
            value={selectedVillage}
          />
        </div>
        <div>
          <Table
            selectedItem={seletectItem}
            onDelete={onDelete}
            data={data}
            setIsViewing={setIsViewing}
          />
          <TableCom
            data={districts}
            title="Districts list"
            entity="districts"
            onDelete={onDelete}
            selectedItem={seletectItem}
          />
          <TableCom
            data={communes}
            title="Communes list"
            entity="communes"
            onDelete={onDelete}
            selectedItem={seletectItem}
          />
          <TableCom
            data={villages}
            title="Villages list"
            entity="villages"
            onDelete={onDelete}
            selectedItem={seletectItem}
          />
        </div>

        {isViewing && <ViewDetail data={data} setIsViewing={setIsViewing} />}
      </div>
    </div>
  );
}

export default App;
