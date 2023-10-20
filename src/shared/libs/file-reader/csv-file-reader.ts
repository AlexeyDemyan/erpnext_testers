import { FileReader } from "./file-reader.interface.js";
import { readFileSync } from "node:fs";

export class CSVFileReader implements FileReader {
  private rawData = "";

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: "utf-8" });
  }

  public toArray(): string {
    if (!this.rawData) {
      throw new Error("File was not read");
    }

    return this.rawData;
  }
}
