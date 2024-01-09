import { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";
import { Dropdown, TextIinput } from "./Input";

export const CommuneForm = ({
  onSave,
  districtData,
  provincesData,
  value,
  setValue,
  onEdit,
}) => {
  const [form, setForm] = useState({
    latin: value?.latin || "",
    khmer: value?.khmer || "",
    district_id: value?.district_id || "",
    province_id: value?.province_id || "",
  });
  const [error, setError] = useState({
    latin: "",
    khmer: "",
    district_id: "",
  });
  const [provinces, setProvince] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    province_id: "",
    district_id: "",
  });

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });

    if (name === "province_id") {
      setSelectedItem({ ...selectedItem, province_id: value });
      updateDropdown;
    }
  };

  const handleClick = () => {
    const checkError = {
      latin: !form.latin ? "Latin name is required" : "",
      khmer: !form.khmer ? "Khmer name is required" : "",
      district_id: !form.district_id ? "District is required" : "",
    };

    setError(checkError);

    if (!checkError.khmer && !checkError.latin && !checkError.district_id) {
      if (form.id) {
        onEdit("communes", form);
        setValue({});
      } else {
        onSave("communes", form);
      }
      setForm({
        latin: "",
        khmer: "",
        district_id: form.district_id,
      });
    }
  };

  const onClear = () => {
    setForm({ latin: "", khmer: "", district_id: "", province_id: "" });
    setValue({});
  };

  const updateDropdown = useMemo(() => {
    setProvince(provincesData);
    setDistrict(
      districtData.filter((dis) => dis.province_id === selectedItem.province_id)
    );
  }, [districtData, selectedItem, provincesData]);

  useEffect(() => {
    setProvince(provincesData);
    if (value.id) {
      setDistrict(
        districtData.filter((dis) => dis.province_id === value.province_id)
      );
      setForm(value);
      setValue({});
    }
  }, [provincesData, districtData, value, setValue]);

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
            value={form.province_id}
            placeHolder="Choose a province"
            error={error.province_id}
          />
          <Dropdown
            label="Districts"
            data={districts}
            value={form.district_id}
            name="district_id"
            onChange={handleFormChange}
            placeHolder="Choose a district"
            error={error.district_id}
          />
        </div>
        <div className="mb-2">
          <Button className="mr-2" onClick={handleClick}>
            {form.id ? "Update" : "Save"}
          </Button>
          <Button onClick={onClear}>Clear</Button>
        </div>
      </div>
    </div>
  );
};
