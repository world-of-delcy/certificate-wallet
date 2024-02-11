export const filter = (searchText, certificates) => {
  const filteredCertificates = certificates.filter((certificate) =>
    certificate.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filteredCertificates;
};

export const categorize = (certificates) => {
  const categorizedCertificates = certificates.reduce((acc, certificate) => {
    const { category } = certificate;
    const categoryIndex = acc.findIndex((c) => c.id === category.id);
    if (categoryIndex === -1) {
      acc.push({
        id: category.id,
        name: category.name,
        certificates: [certificate],
      });
    } else {
      acc[categoryIndex].certificates.push(certificate);
    }
    return acc;
  }, []);
  return categorizedCertificates;
};

export const sort = (certificates) => {
  const sortedCertificates = [...certificates];
  sortedCertificates.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  return sortedCertificates;
};

export const toggleImportant = (id, certificates) => {
  const updatedCertificates = certificates.map((certificate) => {
    if (certificate.id === id) {
      return { ...certificate, important: !certificate.important };
    }
    return certificate;
  });
  return updatedCertificates;
};

export default {
  filter,
  categorize,
  sort,
};
