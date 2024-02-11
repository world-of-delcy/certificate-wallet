import { useState, useEffect } from "react";
import Card from "../Common/Card";
import { categorize } from "../../Utils/certificates";
import { getMyImportantCertificates } from "../../Services/backend";
import Loading from "../Common/Loading";

function Importants() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCertificates = async () => {
    setLoading(true);
    const certificates = await getMyImportantCertificates();
    setLoading(false);
    if (certificates instanceof Error) return alert(certificates.message);
    setCertificates(certificates);
  };
  useEffect(() => {
    fetchCertificates();
  }, []);

  const displayCertificates = categorize(
    certificates.filter((certificate) => certificate.isImportant)
  );
  return (
    <div className="page  important-page-bg">
      <h1 className="text-3xl font-bold text-[--primary-color]">
        Important Certificates
      </h1>
      {displayCertificates.length ? (
        displayCertificates.map((category) => (
          <div
            className="container flex flex-col gap-4 py-10"
            key={category.name}
          >
            <h1 className="font-medium text-xl">
              {category.name} ({category.certificates.length})
            </h1>
            <div className="flex gap-4 overflow-scroll">
              {category.certificates.map((certificate) => (
                <Card key={certificate.id} {...certificate} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <h1 className="py-8">Oops... No Importants found</h1>
      )}
      {loading && <Loading />}
    </div>
  );
}

export default Importants;
