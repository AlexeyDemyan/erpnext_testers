import { Command } from "./command.interface.js";
import { CSVFileReader } from "../../shared/libs/file-reader/csv-file-reader.js";
import { establishColumns, getColumnNumbers } from "../../shared/helpers/common.js";

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

      return 'Error has occured, please check error log in console';
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename1, filename2] = parameters;

    try {
      const stockEntryHeaders = await this.load(filename1);
      const itemsHeaders = await this.load(filename2);
      const columnsToTake = establishColumns(stockEntryHeaders);
      getColumnNumbers(columnsToTake, itemsHeaders);
    } catch (error: unknown) {
      console.error('Cannot generate data');
    }
  }
}
