import { useEffect, useMemo, useState } from "react";
import { Button } from "../Button";
import { Dropdown, TextIinput } from "../Input";

export const VillageForm = ({
  onSave,
  provincesData,
  communesData,
  districtsData,
  value,
  setValue,
  onEdit,
}) => {
  const [form, setForm] = useState({
    latin: value?.latin || "",
    khmer: value?.khmer || "",
    commune_id: value?.commune_id || "",
    district_id: value?.district_id || "",
    province_id: value?.province_id || "",
  });
  const [error, setError] = useState({
    latin: "",
    khmer: "",
    commune_id: "",
    district_id: "",
    province_id: "",
  });

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

    if (name === "province_id") {
      setSelectedItem({ ...selectItem, province_id: value });
    }
    if (name === "district_id") {
      setSelectedItem({ ...selectItem, district_id: value });
    }
  };

  const handleClick = () => {
    const checkError = {
      latin: !form.latin ? "Latin name is required" : "",
      khmer: !form.khmer ? "Khmer name is required" : "",
      commune_id: !form.commune_id ? "Commune is required" : "",
      district_id: !form.district_id ? "District is required" : "",
      province_id: !form.province_id ? "Province is required" : "",
    };

    setError(checkError);

    if (
      !checkError.khmer &&
      !checkError.latin &&
      !checkError.commune_id &&
      !checkError.district_id &&
      !checkError.province_id
    ) {
      if (form.id) {
        onEdit("villages", form);
        setValue({});
      } else {
        onSave("villages", form);
      }
      setForm({
        latin: "",
        khmer: "",
        commune_id: form.commune_id,
      });
    }
  };

  const onClear = () => {
    setForm({
      latin: "",
      khmer: "",
      commune_id: "",
      province_id: "",
      district_id: "",
    });
    setValue({});
  };

  // const updateDropdown = useMemo(() => {
  //   setProvince(provincesData);
  //   setDistrict(
  //     districtsData.filter((dis) => dis.province_id === selectItem.province_id)
  //   );
  //   setCommune(
  //     communesData.filter((com) => com.district_id === selectItem.district_id)
  //   );
  // }, [provincesData, districtsData, communesData, selectItem]);

  useEffect(() => {
    setProvince(provincesData);
  }, [provincesData]);

  useEffect(() => {
    setDistrict(
      districtsData.filter((dis) => dis.province_id === selectItem.province_id)
    );
    setCommune(
      communesData.filter((com) => com.district_id === selectItem.district_id)
    );
  }, [selectItem, districtsData, communesData]);

  useEffect(() => {
    setForm(value);

    if (value.id) {
      setDistrict(
        districtsData.filter((dis) => dis.province_id === value.province_id)
      );

      setCommune(
        communesData.filter((com) => com.district_id === value.district_id)
      );
    }
  }, [value, communesData, districtsData]);

  // useEffect(() => {
  //   let filterDistrict;
  //   let filterCommune;
  //   if (value.id) {
  //     filterDistrict = districtsData.filter(
  //       (dis) => dis.province_id === value.province_id
  //     );

  //     filterCommune = communesData.filter(
  //       (com) => com.district_id === value.district_id
  //     );

  //     setForm(value);
  //   }

  //   setProvince(provincesData);
  //   setDistrict(filterDistrict);
  //   setCommune(filterCommune);
  // }, [provincesData, districtsData, communesData, setValue, value]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col mt-5 bg-white rounded-lg shadow-md p-4 ">
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
            value={form.province_id}
            onChange={handleFormChange}
            placeHolder="Choose a province"
            error={error.province_id}
          />
          <Dropdown
            label="Districts"
            data={districts}
            name="district_id"
            value={form.district_id}
            onChange={handleFormChange}
            placeHolder="Choose a district"
            error={error.district_id}
          />
          <Dropdown
            label="communes"
            data={communes}
            name="commune_id"
            value={form.commune_id}
            onChange={handleFormChange}
            placeHolder="Choose a communes"
            error={error.commune_id}
          />
          <Button className="mr-2" onClick={handleClick}>
            {form.id ? "Update" : "Save"}
          </Button>
          <Button onClick={onClear}>Clear</Button>
        </div>
      </div>
    </div>
  );
};
