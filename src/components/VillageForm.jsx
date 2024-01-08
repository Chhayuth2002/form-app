import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Dropdown, TextIinput } from "./Input";

export const VillageForm = ({
  onSave,
  provincesData,
  communesData,
  districtsData,
}) => {
  const [form, setForm] = useState({ latin: "", khmer: "", commune_id: "" });
  const [error, setError] = useState({ latin: "", khmer: "", commune_id: "" });

  const [provinces, setProvince] = useState([]);
  const [communes, setCommune] = useState([]);
  const [districts, setDistrict] = useState([]);

  const [selectItem, setSelectedItem] = useState({
    province_id: "",
    commune_id: "",
  });

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });

    if (name === "province_id")
      setSelectedItem({ ...selectItem, province_id: value });
    if (name === "district_id")
      setSelectedItem({ ...selectItem, district_id: value });
  };

  const onClickSave = () => {
    const checkError = {
      latin: !form.latin ? "Latin name is required" : "",
      khmer: !form.khmer ? "Khmer name is required" : "",
      commune_id: !form.commune_id ? "District is required" : "",
    };

    setError(checkError);

    if (!error.latin && !error.khmer && !error.commune_id) {
      onSave(form);
      setForm({ latin: "", khmer: "", commune_id: form.commune_id });
    }
  };

  useEffect(() => {
    const filterDistrict = districtsData.filter(
      (dis) => dis.province_id === selectItem.province_id
    );

    const filterCommune = communesData.filter(
      (com) => com.district_id === selectItem.district_id
    );

    setProvince(provincesData);
    setDistrict(filterDistrict);
    setCommune(filterCommune);
  }, [provincesData, districtsData, communesData, selectItem]);

  return (
    <div className="flex items-center justify-center border-b-2 border-neutral-300">
      <div className="flex flex-col mt-5 ">
        <h1 className=" text-neutral-600 text-center text-3xl font-bold pb-2">
          Village Form
        </h1>
        <div className="py-2 flex items-center justify-center">
          <div className="flex flex-row gap-2">
            <TextIinput
              onChange={handleFormChange}
              label="Latin"
              name="latin"
              value={form.latin}
              error={error.latin}
            />
            <TextIinput
              onChange={handleFormChange}
              label="Khmer"
              name="khmer"
              value={form.khmer}
              error={error.khmer}
            />
          </div>
        </div>
        <div className="mb-2">
          <Dropdown
            label="Provinces"
            data={provinces}
            name="province_id"
            onChange={handleFormChange}
            placeHolder="Choose a province"
          />
          <Dropdown
            label="Districts"
            data={districts}
            name="district_id"
            onChange={handleFormChange}
            placeHolder="Choose a district"
          />
          <Dropdown
            label="communes"
            data={communes}
            name="commune_id"
            onChange={handleFormChange}
            placeHolder="Choose a communes"
            error={error.commune_id}
          />
          <Button className="mr-2" onClick={onClickSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
