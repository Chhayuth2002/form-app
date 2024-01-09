import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Dropdown, TextIinput } from "./Input";

export const DistrictForm = ({
  provincesData,
  onSave,
  value,
  setValue,
  onEdit,
}) => {
  const [form, setForm] = useState({
    latin: value?.latin || "",
    khmer: value?.khmer || "",
    province_id: value?.province_id || "",
  });
  const [error, setError] = useState({ latin: "", khmer: "", province_id: "" });
  const [isDisable, setIsDisable] = useState(false);
  const [provinces, setProvince] = useState([]);

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleClick = () => {
    const checkError = {
      province_id: !form.province_id ? "Province is required" : "",
      latin: !form.latin ? "Latin name is required" : "",
      khmer: !form.khmer ? "Khmer name is required" : "",
    };

    setError(checkError);

    if (!checkError.khmer && !checkError.latin && !checkError.province_id) {
      if (value.id) {
        onEdit("districts", form);
        setValue({});
      } else {
        onSave("districts", form);
      }
      setForm({
        latin: "",
        khmer: "",
        province_id: form.province_id,
      });
    }
  };

  const onClear = () => {
    setForm({ latin: "", khmer: "", province_id: "" });
    setValue({});
  };

  useEffect(() => {
    setIsDisable(provinces.length ? false : true);
    setProvince(provincesData);
    setForm(value);
  }, [provinces, provincesData, value]);

  return (
    <div className="flex border-b-2 items-center justify-center ">
      <div className="flex flex-col mt-5">
        <h1 className=" text-neutral-600 text-center text-3xl font-bold mb-2">
          District Form
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
            label="Province"
            data={provinces}
            error={error.province_id}
            name="province_id"
            onChange={handleFormChange}
            value={form.province_id}
            placeHolder="Choose a province"
          />
          <Button className="mr-2" isDisable={isDisable} onClick={handleClick}>
            {value.id ? "Update" : "Save"}
          </Button>
          <Button onClick={onClear}>Clear</Button>
        </div>
      </div>
    </div>
  );
};
