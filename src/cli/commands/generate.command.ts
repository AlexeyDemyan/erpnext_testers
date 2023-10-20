import { Command } from "./command.interface.js";
import { CSVFileWriter } from "../../shared/libs/file-writer/index.js";
import { CSVFileReader } from "../../shared/libs/file-reader/csv-file-reader.js";
import { manipulateData } from "../../shared/helpers/index.js";

export class GenerateCommand implements Command {
  public getName(): string {
    return "--generate";
  }

  public async load(filename: string): Promise<string> {
    const fileReader = new CSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
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

  public async write(filepath: string, data: string): Promise<void> {
    const csvFileWriter = new CSVFileWriter(filepath);

    await csvFileWriter.write(data);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename, filepath] = parameters;

    try {
      const loadedDAta = await this.load(filename);
      const transformedData = await manipulateData(loadedDAta);
      await this.write(filepath, transformedData);
      console.info(`File ${filepath} was created and written into`)
    } catch (error: unknown) {
      console.error('Cannot generate data');
    }
  }
}
