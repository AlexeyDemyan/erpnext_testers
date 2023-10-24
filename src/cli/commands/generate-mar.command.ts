import { Command } from "./command.interface.js";
import { CSVFileReader } from "../../shared/libs/file-reader/csv-file-reader.js";
import { CSVFileWriter } from "../../shared/libs/file-writer/index.js";
import {
  generateLinesForCSV,
  generateOutputCSVFileFromArray,
  establishColumns,
  getColumnNumbers,
  swapWarehouses
} from "../../shared/helpers/index.js";

export class TestMethodCommand implements Command {
  public getName(): string {
    return "--generate-mar";
  }

  public async load(filename: string): Promise<string> {
    const fileReader = new CSVFileReader(filename.trim());

    try {
      fileReader.read();
      return fileReader.toArray();
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
    const [filename1, filename2, filepath] = parameters;

    try {
      const stockEntryHeaders = await this.load(filename1);
      const itemsData = await this.load(filename2);
      const itemLines = await generateLinesForCSV(itemsData);
      const columnsToTake = await establishColumns(stockEntryHeaders);
      const columnNumbers = await getColumnNumbers(columnsToTake, itemsData);
      const generatedData = await generateOutputCSVFileFromArray(columnsToTake, itemLines, columnNumbers);
      const swappedData = await swapWarehouses(generatedData);
      await this.write(filepath, swappedData)
    } catch (error: unknown) {
      console.error("Cannot generate data");
    }
  }
}
