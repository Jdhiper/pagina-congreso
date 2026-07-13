import { readFile } from "fs/promises";
import path from "path";

export async function loadTemplate() {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "certificates",
    "templates",
    "default.pdf"
  );

  return await readFile(templatePath);
}