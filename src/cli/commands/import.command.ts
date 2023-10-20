import { Command } from "./command.interface.js";
import { CSVFileReader } from "../../shared/libs/file-reader/index.js";

export class ImportCommand implements Command {
  public getName(): string {
    return "--import";
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new CSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
