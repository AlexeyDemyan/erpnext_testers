import { FileReader } from "./file-reader.interface.js";
import { readFileSync } from "node:fs";
import { read } from "xlsx";

export class ExcelFileReader implements FileReader {
  private rawData = "";

  constructor(private readonly filename: string) {}

  public read(): void {
    const buf = readFileSync(this.filename);
    const workbook = read(buf);
    this.rawData = workbook.SheetNames.join('');
  }

  public outputData(): string {
    if (!this.rawData) {
      throw new Error("File was not read");
    }

    return this.rawData;
  }
}
