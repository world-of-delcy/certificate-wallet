import { client } from ".";

export async function getCertificates(userId: string) {
  const certificates = await client.certificates.findMany({
    where: { userId },
    include: { category: true },
  });
  return certificates;
}

export async function getImportantCertificates(userId: string) {
  const certificates = await client.certificates.findMany({
    where: { AND: [{ isImportant: true }, { userId }] },
    include: { category: true },
  });
  return certificates;
}

export async function getCertificate(id: string) {
  const certificate = await client.certificates.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!certificate) return new Error("certificate not found");
  return certificate;
}

export async function toggleImportant(certificateId: string) {
  const certificate = await client.certificates.findUnique({
    where: { id: certificateId },
  });
  if (!certificate) return new Error("certificate not found");
  const updatedCertificate = await client.certificates.update({
    where: { id: certificateId },
    data: { isImportant: !certificate.isImportant },
    include: { category: true },
  });

  return updatedCertificate;
}

interface CreateCertificate {
  userId: string;
  name: string;
  url: string;
  thumbnail: string;
  categoryId: string;
  isImportant?: string;
  expiresOn?: Date;
}

export async function createCertificate({
  userId,
  name,
  url,
  thumbnail,
  isImportant,
  categoryId,
  expiresOn,
}: CreateCertificate) {
  const certificate = await client.certificates.create({
    data: {
      name,
      thumbnail,
      url,
      isImportant: isImportant === "true",
      expiresOn: expiresOn ? new Date(expiresOn) : undefined,
      category: {
        connect: {
          id: categoryId,
        },
      },
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return certificate;
}

export async function deleteCertificate(id: string) {
  const certificate = await client.certificates.findUnique({
    where: { id },
  });
  if (!certificate) return new Error("certificate not found");
  await client.certificates.delete({
    where: { id },
  });
  return certificate;
}
