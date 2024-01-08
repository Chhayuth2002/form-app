import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Dropdown, TextIinput } from "./Input";

export const CommuneForm = ({ onSave, districtData, provincesData }) => {
  const [form, setForm] = useState({ latin: "", khmer: "", district_id: "" });
  const [error, setError] = useState({ latin: "", khmer: "", district_id: "" });
  const [provinces, setProvince] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });

    if (name === "province_id") {
      setSelectedItem(value);
    }
  };

  const onClickSave = () => {
    const checkError = {
      latin: !form.latin ? "Latin name is required" : "",
      khmer: !form.khmer ? "Khmer name is required" : "",
      district_id: !form.district_id ? "District is required" : "",
    };

    setError(checkError);

    if (!error.latin && !error.khmer && !error.district_id) {
      onSave(form);
      setForm({ latin: "", khmer: "", district_id: form.district_id });
    }
  };

  useEffect(() => {
    setProvince(provincesData);
    setDistrict(districtData.filter((dis) => dis.province_id === selectedItem));
  }, [provincesData, districtData, selectedItem]);

  return (
    <div className="flex items-center justify-center border-b-2 border-neutral-300">
      <div className="flex flex-col mt-5 ">
        <h1 className=" text-neutral-600 text-center text-3xl font-bold pb-2">
          Commune Form
        </h1>
        <div className="py-2 flex flex-col items-center justify-center">
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
        <div className="">
          <Dropdown
            label="Provinces"
            data={provinces}
            name="province_id"
            onChange={handleFormChange}
            placeHolder="Choose a province"
            error={error.province_id}
          />
          <Dropdown
            label="Districts"
            data={districts}
            name="district_id"
            onChange={handleFormChange}
            placeHolder="Choose a district"
            error={error.district_id}
          />
        </div>
        <div className="mb-2">
          <Button className="mr-2" onClick={onClickSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
