import { useEffect, useState } from "react";
import { Button } from "./Button";
import { TextIinput } from "./Input";

export const ProvinceForm = ({ onSave, onEdit, value = {}, setValue }) => {
  const [form, setForm] = useState({
    latin: value?.latin || "",
    khmer: value?.khmer || "",
  });
  const [error, setError] = useState({ latin: "", khmer: "" });

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleClick = () => {
    const checkError = {
      latin: !form.latin ? "Latin name is required" : "",
      khmer: !form.khmer ? "Khmer name is required" : "",
    };

    setError(checkError);

    if (!checkError.latin && !checkError.khmer) {
      if (value.id) {
        onEdit("provinces", form);
        setValue({});
      } else {
        onSave("provinces", form);
      }

      setForm({ latin: "", khmer: "" });
    }
  };

  const onClear = () => {
    setForm({ latin: "", khmer: "" });
    setValue({});
  };

  useEffect(() => {
    setForm(value);
  }, [value]);

  return (
    <div className="flex border-b-2 items-center justify-center border-neutral-300">
      <div className="flex flex-col mt-5">
        <h1 className=" text-neutral-600 text-center text-3xl font-bold mb-2">
          Province Form
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
          <Button className="mr-2" onClick={handleClick}>
            {!value.id ? "Save" : "Update"}
          </Button>
          <Button onClick={onClear}>Clear</Button>
        </div>
      </div>
    </div>
  );
};
