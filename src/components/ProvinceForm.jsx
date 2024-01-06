import { useState } from "react";
import { Button } from "./Button";
import { TextIinput } from "./Input";

export const ProvinceForm = ({ onSave }) => {
  const [form, setForm] = useState({ latin: "", khmer: "" });

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const onClickSave = () => {
    onSave(form);
    setForm({ latin: "", khmer: "" });
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-center pt-20">
        <div className="flex flex-col pb-10">
          <h1 className=" text-neutral-600 text-center text-3xl font-bold">
            Province Form
          </h1>
          <div className="py-2 flex items-center justify-center">
            <div className="mr-2">
              <TextIinput
                onChange={handleFormChange}
                label="Latin"
                name={"latin"}
                value={form.latin}
              />
            </div>
            <div>
              <TextIinput
                onChange={handleFormChange}
                label="Khmer"
                name={"khmer"}
                value={form.khmer}
              />
            </div>
            <div className="mt-4 ml-3">
              <Button className="mr-2" onClick={onClickSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
