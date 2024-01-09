import uuid from "react-uuid";
import { useMemo, useState } from "react";

import { ProvinceForm } from "./components/form/ProvinceForm";
import { DistrictForm } from "./components/form/DistrictForm";
import { CommuneForm } from "./components/form/CommuneForm";
import { VillageForm } from "./components/form/VillageForm";
import { ProvinceTable } from "./components/table/ProvinceTable";
import { Table } from "./components/table/Table";

import provincesData from "./data/provinces";
import districtData from "./data/districts";
import commuenData from "./data/communes";
import villageData from "./data/villages";

function App() {
  const [provinces, setProvinces] = useState(provincesData);
  const [districts, setDistricts] = useState(districtData);
  const [communes, setCommunes] = useState(commuenData);
  const [villages, setVillages] = useState(villageData);

  const [selectedProvince, setSelectedProvince] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedCommune, setSelectedCommune] = useState({});
  const [selectedVillage, setSelectedVillage] = useState({});

  // Map the state to add and edit
  const stateMap = {
    provinces: setProvinces,
    districts: setDistricts,
    communes: setCommunes,
    villages: setVillages,
  };

  // Update province list
  const data = useMemo(() => {
    const result = provinces.map((province) => {
      const totalDistrctInProvince = districts.filter(
        (district) => district.province_id === province.id
      );

      const totalCommuneInDistrct = communes.filter((commune) =>
        totalDistrctInProvince.find(
          (district) => district.id === commune.district_id
        )
      );

      const totalVillageInCommune = villages.filter((village) =>
        totalCommuneInDistrct.find(
          (commune) => commune.id === village.commune_id
        )
      );

      return {
        ...province,
        total_districts: totalDistrctInProvince.length,
        total_communes: totalCommuneInDistrct.length,
        total_villages: totalVillageInCommune.length,
      };
    });

    return result;
  }, [provinces, districts, communes, villages]);

  // Add
  const onSave = (entity, params) => {
    const newData = {
      id: uuid(),
      ...params,
    };

    const setState = stateMap[entity];

    if (setState) {
      setState((pre) => [...pre, newData]);
    }
  };

  // Edit
  const onEdit = (entity, params) => {
    const setState = stateMap[entity];

    if (setState) {
      setState((prev) =>
        prev.map((item) =>
          item.id === params.id ? { ...item, ...params } : item
        )
      );
    }
  };

  // Delete
  const onDelete = (id, entity) => {
    if (entity === "provinces") {
      const districtToDelete = districts.filter(
        (district) => district.province_id === id
      );
      const communeToDelete = communes.filter((commune) =>
        districtToDelete.some((district) => district.id === commune.district_id)
      );
      const villageToDelete = villages.filter((village) =>
        communeToDelete.some((commune) => commune.id === village.commune_id)
      );

      setProvinces(provinces.filter((province) => province.id !== id));
      setDistricts(
        districts.filter((district) => !districtToDelete.includes(district))
      );
      setCommunes(
        communes.filter((commune) => !communeToDelete.includes(commune))
      );
      setVillages(
        villages.filter((village) => !villageToDelete.includes(village))
      );
    }

    if (entity === "districts") {
      const communeToDelete = communes.filter(
        (commune) => commune.district_id === id
      );
      const villageToDelete = villages.filter((village) =>
        communeToDelete.some((commune) => commune.id === village.commune_id)
      );

      setDistricts(districts.filter((district) => district.id !== id));
      setCommunes(
        communes.filter((commune) => !communeToDelete.includes(commune))
      );
      setVillages(
        villages.filter((village) => !villageToDelete.includes(village))
      );
    }

    if (entity === "communes") {
      const villageToDelete = villages.filter(
        (village) => village.commune_id === id
      );

      setCommunes(communes.filter((commune) => commune.id !== id));
      setVillages(
        villages.filter((village) => !villageToDelete.includes(village))
      );
    }

    if (entity === "villages") {
      setVillages(villages.filter((village) => village.id !== id));
    }
  };

  // Selecte item and send to edit form
  const seletectItem = (id, entity) => {
    if (entity === "provinces") {
      setSelectedProvince(provinces.find((province) => province.id === id));
    }

    if (entity === "districts") {
      const findDistrict = districts.find((district) => district.id === id);
      const findProvince = provinces.find(
        (province) => province.id === findDistrict.province_id
      ).id;

      setSelectedDistrict({
        ...findDistrict,
        province_id: findProvince,
      });
    }

    if (entity === "communes") {
      const findCommune = communes.find((commune) => commune.id === id);
      const findDistrict = districts.find(
        (district) => district.id === findCommune.district_id
      );

      const findProvince = provinces.find(
        (province) => province.id === findDistrict.province_id
      ).id;

      setSelectedCommune({
        ...findCommune,
        district_id: findDistrict.id,
        province_id: findProvince,
      });
    }

    if (entity === "villages") {
      const findVillage = villages.find((village) => village.id === id);
      const findCommune = communes.find(
        (commune) => commune.id === findVillage.commune_id
      );
      const findDistrict = districts.find(
        (district) => district.id === findCommune.district_id
      );

      const findProvince = provinces.find(
        (province) => province.id === findDistrict.province_id
      ).id;

      setSelectedVillage({
        ...findVillage,
        commune_id: findCommune.id,
        district_id: findDistrict.id,
        province_id: findProvince,
      });
    } else {
      selectedProvince;
    }
  };

  return (
    <div className=" bg-slate-300">
      <div className="container mx-auto w-[2000px] flex flex-row">
        <div className="mr-5 p-5 border-r-2">
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
            setValue={setSelectedCommune}
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
        <div className="w-full">
          <ProvinceTable
            selectedItem={seletectItem}
            onDelete={onDelete}
            data={data}
            provinces={provinces}
            districts={districts}
            communes={communes}
            villages={villages}
          />
          <Table
            data={districts}
            title="Districts list"
            entity="districts"
            onDelete={onDelete}
            selectedItem={seletectItem}
          />
          <Table
            data={communes}
            title="Communes list"
            entity="communes"
            onDelete={onDelete}
            selectedItem={seletectItem}
          />
          <Table
            data={villages}
            title="Villages list"
            entity="villages"
            onDelete={onDelete}
            selectedItem={seletectItem}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
