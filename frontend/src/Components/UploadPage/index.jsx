import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCertificate, getCategories } from "../../Services/backend";

import Datepicker from "react-tailwindcss-datepicker";
import Upload from "../Common/Upload";
import Loading from "../Common/Loading";

function UploadPage() {
  const urlParams = new URLSearchParams(useLocation().search);
  const categoryParam = urlParams.get("category");
  const importantParam = urlParams.get("important") == "true";
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isImportant, setIsImportant] = useState(importantParam);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const categories = await getCategories();
      setLoading(false);
      if (categories instanceof Error) return alert(categories.message);
      setCategories(categories);
      let selectedCategory = categories.find((cat) => cat.id === categoryParam);
      if (!selectedCategory && categories[0]) selectedCategory = categories[0];
      setSelectedCategory(selectedCategory.id);
    };
    fetchCategories();
  }, []);
  const handleFileUpload = (file) => {
    if (!file) return;
    const size = file.size / 1024 / 1024;
    if (size > 3) return alert("Choose file less than 3 MB");
    setFile(file);
  };

  const handleSubmit = async () => {
    if (!name) return alert("Fill name field");
    if (!file) return alert("Upload a file to continue");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("categoryId", selectedCategory);
    formData.append("isImportant", isImportant);
    if (date.startDate) formData.append("expiresOn", date.startDate);
    setLoading(true);
    const certificate = await createCertificate(formData);
    setLoading(false);
    if (certificate instanceof Error) return alert(certificate.message);
    navigate("/");
  };
  return (
    <div className="page upload-page upload-page-bg relative -top-16">
      <div className="flex flex-col w-1/2 gap-4 pb-24 items-center justify-around p-4 rounded-3xl">
        <h1 className="text-2xl text-[--primary-color]">Enter Details</h1>
        <div className="w-full flex items-center justify-between">
          <label htmlFor="name" className="required">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="w-64 py-3 rounded-lg text-center"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <label htmlFor="category" className="required">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="w-64 py-3 rounded-lg text-center"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex items-center justify-between">
          <label htmlFor="datepicker">Expires on</label>
          <div className="w-64">
            <Datepicker
              asSingle
              value={date}
              onChange={setDate}
              useRange={false}
              minDate={Date.now()}
              primaryColor="orange"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <label htmlFor="isImportant" className="required">
            Important Certificate
          </label>
          <div
            className="flex items-center gap-2 px-4 py-3"
            onChange={(e) => setIsImportant(e.target.value === "true")}
          >
            <input
              type="radio"
              value="true"
              name="isImportant"
              className="w-4 h-4 focus:outline-none"
            />
            Yes
            <input
              type="radio"
              value="false"
              name="isImportant"
              className="w-4 h-4 focus:outline-none"
              defaultChecked
            />
            No
          </div>
        </div>
        <Upload value={file} onChange={handleFileUpload} />
        <button
          className="bg-[--primary-color] py-3 px-6 text-center text-white text-lg rounded-2xl"
          onClick={handleSubmit}
        >
          Sumbit
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default UploadPage;
