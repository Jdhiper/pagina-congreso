import { readFile } from "fs/promises";
import path from "path";
import type { CertificateType } from "../types/certificate";

const templateFiles: Record<CertificateType, string> = {
  presencial: "presencial.pdf",
  virtual: "virtual.pdf",
};

export async function loadTemplate(type: CertificateType) {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "certificates",
    "templates",
    templateFiles[type]
  );

  try {
    return await readFile(templatePath);
  } catch (error) {
    const fileSystemError = error as NodeJS.ErrnoException;

    if (fileSystemError.code !== "ENOENT") {
      throw error;
    }

    // Mantiene el sistema operativo mientras se reemplazan las dos plantillas.
    return readFile(
      path.join(
        process.cwd(),
        "src",
        "certificates",
        "templates",
        "default.pdf"
      )
    );
  }
}
