import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Example:
            cli.js --<command> [--arguments]
        Commands:
            --help:                      # print help
            --import <path>:             # import data from TSV
            --generate <n> <path> <url>  # Generate random amount of test data
    `);
  }
}
