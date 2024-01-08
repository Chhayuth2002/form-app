import { useEffect, useState } from "react";
import { Button } from "./Button";
import { TextIinput } from "./Input";

export const ProvinceForm = ({ onSave, value = {}, onEdit, setValue }) => {
  const [form, setForm] = useState({
    latin: "",
    khmer: "",
  });
  const [error, setError] = useState({ latin: "", khmer: "" });

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const onClickSave = () => {
    if (!form.latin)
      setError({ ...error, latin: (error.latin = "Latin name required") });
    if (!form.khmer)
      setError({ ...error, khmer: (error.khmer = "Khmer name required") });

    if (!error.khmer && !error.latin) {
      onSave(form);
      setForm({ latin: "", khmer: "" });
    }
  };

  const onClickUpdate = () => {
    if (!form.latin)
      setError({ ...error, latin: (error.latin = "Latin name required") });
    if (!form.khmer)
      setError({ ...error, khmer: (error.khmer = "Khmer name required") });

    if (!error.khmer && !error.latin) {
      onEdit({ ...form, id: value.id });
      setForm({ latin: "", khmer: "" });
      setValue({});
    }
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
          {!value.khmer ? (
            <Button onClick={onClickSave}>Save</Button>
          ) : (
            <Button onClick={onClickUpdate}>Update</Button>
          )}
        </div>
      </div>
    </div>
  );
};
