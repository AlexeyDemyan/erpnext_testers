import { Command } from "./command.interface.js";
import { CSVFileReader } from "../../shared/libs/file-reader/csv-file-reader.js";
import {
  generateLinesForCSV,
  generateOutputCSVFileFromArray,
  establishColumns,
  getColumnNumbers,
} from "../../shared/helpers/index.js";

export class TestMethodCommand implements Command {
  public getName(): string {
    return "--test-method";
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

  public async execute(...parameters: string[]): Promise<void> {
    const [filename1, filename2] = parameters;

    try {
      const stockEntryHeaders = await this.load(filename1);
      const itemsData = await this.load(filename2);
      const itemLines = generateLinesForCSV(itemsData);
      const columnsToTake = establishColumns(stockEntryHeaders);
      const columnNumbers = getColumnNumbers(columnsToTake, itemsData);
      generateOutputCSVFileFromArray(stockEntryHeaders, itemLines, columnNumbers);
    } catch (error: unknown) {
      console.error("Cannot generate data");
    }
  }
}
