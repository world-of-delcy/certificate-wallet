import { exec } from "child_process";
import { promisify } from "util";
import { join } from "path";
import { existsSync, mkdirSync, unlink } from "fs";

const execAsync = promisify(exec);

export const generateThumbnail = async (pdfFilePath: string) => {
  pdfFilePath = join(__dirname, "..", "..", pdfFilePath);
  const thumbnailPath = join(__dirname, "..", "..", "public", "thumbnails");
  if (!existsSync(thumbnailPath)) mkdirSync(thumbnailPath);
  const fileName = pdfFilePath.split("\\").pop()?.split(".").shift();
  const thumbnailName = `${fileName}.jpg`;
  const thumbnailFilePath = join(thumbnailPath, thumbnailName);
  const command = `magick convert -thumbnail 500x500 -background white -alpha remove -density 300 ${pdfFilePath}[0] ${thumbnailFilePath}`;
  try {
    await execAsync(command);
  } catch (error) {
    console.error(error);
    return null;
  }
  // convert the thumbnail file path to a relative path
  const thumbnailFilePathArray = thumbnailFilePath.split("\\");
  const thumbnailFilePathIndex = thumbnailFilePathArray.indexOf("public");
  const thumbnailFilePathRelative = thumbnailFilePathArray
    .slice(thumbnailFilePathIndex + 1)
    .join("\\");
  return thumbnailFilePathRelative;
};

export const deleteThumbnail = async (thumbnailFilePath: string) => {
  thumbnailFilePath = join(__dirname, "..", "..", "public", thumbnailFilePath);
  unlink(thumbnailFilePath, (err) => {
    if (err) return null;
  });
};

export default {
  generateThumbnail,
  deleteThumbnail,
};
