import { Command } from "./command.interface.js";
import { ExcelFileReader } from "../../shared/libs/file-reader/index.js";
import { CSVFileWriter } from "../../shared/libs/file-writer/index.js";
// import {
//   generateLinesForCSV,
//   generateCSVFile,
//   establishColumns,
//   getColumnNumbers,
//   swapWarehouses
// } from "../../shared/helpers/index.js";

export class GenerateChrisCommand implements Command {
  public getName(): string {
    return "--generate-chris";
  }

  public async load(filename: string): Promise<string> {
    const fileReader = new ExcelFileReader(filename.trim());

    try {
      fileReader.read();
      return fileReader.outputData();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);

      return "Error has occured, please check error log in console";
    }
  }

  public async write(filepath: string, data: string): Promise<void> {
    const csvFileWriter = new CSVFileWriter(filepath);

    await csvFileWriter.write(data);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename, filepath] = parameters;

    try {
      const data = await this.load(filename);
      await this.write(filepath, data)
    } catch (error: unknown) {
      console.error("Cannot generate data");
    }
  }
}
