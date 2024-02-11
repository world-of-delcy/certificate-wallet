import { useNavigate, useParams } from "react-router-dom";

import Icon from "../Common/Icon";
import { useEffect, useState } from "react";
import {
  downloadCertificate,
  getCertificate,
  toggleImportant,
  deleteCertificate,
} from "../../Services/backend";
import { CERTIFICATE_WALLET_BACKEND_URL } from "../../Services/http";
import Loading from "../Common/Loading";

function CertificatePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState();
  const [isImportant, setIsImportant] = useState(false);
  const navigate = useNavigate();

  const handleToggleImportant = async () => {
    setLoading(true);
    const updatedCertificate = await toggleImportant(id);
    setLoading(false);
    setIsImportant(updatedCertificate.isImportant);
  };

  const handleDownload = async () => {
    setLoading(true);
    const blob = await downloadCertificate(id);
    setLoading(false);
    if (blob instanceof Error) return alert("Error downloading certificate");
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = certificate.name;
    a.click();
  };

  const handleDelete = async () => {
    setLoading(true);
    const deleted = await deleteCertificate(id);
    setLoading(false);
    if (deleted instanceof Error) return alert("Error deleting certificate");
    navigate("/");
  };

  useEffect(() => {
    const fetchCertificate = async () => {
      setLoading(true);
      const certificate = await getCertificate(id);
      setLoading(false);
      if (!certificate || certificate instanceof Error) return navigate("/");
      setIsImportant(certificate.isImportant);
      setCertificate(certificate);
    };
    fetchCertificate();
  }, []);
  return (
    <div className="page flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-[--primary-color]">Certificate</h1>
      <div className=" flex gap-8">
        <div className="card w-1/2 h-96 rounded-lg bg-[--secondary-color] flex-shrink-0 flex justify-center overflow-hidden cursor-pointer">
          {certificate && (
            <img
              src={CERTIFICATE_WALLET_BACKEND_URL + "/" + certificate.thumbnail}
              alt="Certificate Image"
              crossOrigin="anonymous"
            />
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex gap-4 flex-col">
            <div className="text-2xl font-bold text-[--primary-color]">
              {certificate?.name}
            </div>

            <div className="font-normal">
              {certificate?.category?.name
                ? "Category: " + certificate?.category?.name
                : "No Category"}
            </div>
            <div className="font-normal">
              {certificate?.expiresOn
                ? "Expires on " +
                  new Date(certificate?.expiresOn).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No Expiry"}
            </div>
            <div className="font-normal">
              {certificate?.createdAt
                ? "Created on " +
                  new Date(certificate?.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </div>
          </div>
          <div className="flex gap-4">
            <div
              className="w-fit px-4 py-3 flex justify-center items-center gap-2 bg-[--primary-color] rounded-xl cursor-pointer"
              onClick={handleToggleImportant}
            >
              <div className="text-white">
                {isImportant ? "Important" : "Set Important"}
              </div>
              <Icon name="star" regular={!isImportant} />
            </div>
            <div
              className="w-fit px-4 py-3 flex justify-center items-center gap-2 bg-[--primary-color] rounded-xl cursor-pointer"
              onClick={handleDownload}
            >
              <div className="text-white">Download</div>
              <Icon name="download" />
            </div>
            <div
              className="w-fit px-4 py-3 flex justify-center items-center gap-2 bg-[--primary-color] rounded-xl cursor-pointer"
              onClick={handleDelete}
            >
              <div className="text-white">Delete</div>
              <Icon name="trash" />
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default CertificatePage;
