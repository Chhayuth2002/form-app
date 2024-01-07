import { useState } from "react";
import { Button } from "./Button";
import { TextIinput } from "./Input";

export const ProvinceForm = ({ onSave }) => {
  const [form, setForm] = useState({ latin: "", khmer: "" });
  const [error, setError] = useState({ latin: "", khmer: "" });

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log("Before State Update:", form);

    setForm({ ...form, [name]: value });
    console.log("After State Update:", form);
  };

  const onClickSave = () => {
    setError({}); // Reset errors

    if (form.latin.trim() === "")
      setError((prevErrors) => ({
        ...prevErrors,
        latin: "Latin name is required",
      }));
    if (form.khmer.trim() === "")
      setError((prevErrors) => ({
        ...prevErrors,
        khmer: "Khmer name is required",
      }));

    if (!error.khmer && !error.latin) {
      onSave(form);
      setForm({ latin: "", khmer: "" });
      setError({ latin: "", khmer: "" });
    }
  };

  return (
    <div className="flex items-center justify-center border-b-2 border-neutral-300">
      <div className="flex flex-col mt-10">
        <h1 className=" text-neutral-600 text-center text-3xl font-bold mb-2">
          Province Form
        </h1>
        <div className="py-2 flex items-center justify-center">
          <div className=" flex flex-row gap-2">
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
            <div className="mt-8">
              <Button className="" onClick={onClickSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
