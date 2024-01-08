import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Dropdown, TextIinput } from "./Input";

export const DistrictForm = ({ provincesData, onSave }) => {
  const [form, setForm] = useState({ latin: "", khmer: "", province_id: "" });
  const [error, setError] = useState({ latin: "", khmer: "", province_id: "" });
  const [isDisable, setIsDisable] = useState(false);
  const [provinces, setProvince] = useState([]);

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const onClickSave = () => {
    const errors = {
      province_id: !form.province_id ? "Province is required" : "",
      latin: !form.latin ? "Latin name is required" : "",
      khmer: !form.khmer ? "Khmer name is required" : "",
    };

    setError(errors);

    if (!error.latin && !error.khmer && !error.province_id) {
      onSave(form);
      setForm({ latin: "", khmer: "", province_id: form.province_id });
    }
  };

  useEffect(() => {
    setIsDisable(provinces.length ? false : true);
    setProvince(provincesData);
  }, [provinces, provincesData]);

  return (
    <div className="flex border-b-2 items-center justify-center border-neutral-300">
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
            placeHolder="Choose a province"
          />
          <Button isDisable={isDisable} onClick={onClickSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
